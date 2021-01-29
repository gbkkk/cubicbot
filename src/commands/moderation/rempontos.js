const Discord = require('discord.js')

module.exports = {
    name: "rempontos",
    aliases: ["rempontos", "revpontos", "removerpontos"],
    run: async(client, message, args, database) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        
        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
        if(!membro) return message.reply("Insira o membro")

        const quantia = args[1]
        if(!quantia) return message.reply("Insira a quantidade de pontos que deseja retirar.")

        database.ref(`Colaborador/${membro.id}`).once('value').then(async function (snap) {
        
            if(snap.val() === null) {

                message.reply("Este usuário não possue nenhum ponto.")

            } else {

                let soma = snap.val().pontos + quantia

                if(snap.val().pontos < quantia) {

                    database.ref(`Colaborador/${membro.id}`).update({
                        pontos: 0
                    })

                    message.reply("A pontuação do usuário foi resetada.")
                    
                } else {

                    database.ref(`Colaborador/${membro.id}`).update({
                        pontos: Number(quantia) - Number(snap.val().pontos)
                    })
    
                    message.reply("Pontuação removida.")

                }

            }

        })

    }
}