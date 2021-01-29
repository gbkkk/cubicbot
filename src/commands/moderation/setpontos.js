const Discord = require('discord.js')

module.exports = {
    name: "setpontos",
    aliases: ["setpontos"],
    run: async(client, message, args, database) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        
        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
        if(!membro) return message.reply("Insira o membro")

        const quantia = args[1]
        if(!quantia) return message.reply("Insira a quantidade de pontos")

        database.ref(`Colaborador/${membro.id}`).once('value').then(async function (snap) {
        
            if(snap.val() === null) {

                database.ref(`Colaborador/${membro.id}`).set({
                    p1: 0,
                    p2: 0,
                    p3: 0,
                    p4: 0,
                    p5: 0,
                    p6: 0,
                    p7: 0,
                    pontos: quantia
                })

                message.reply("Pontos adicionados.")

            } else {

                database.ref(`Colaborador/${membro.id}`).update({
                    pontos: Number(quantia) + Number(snap.val().pontos)
                })

                message.reply("Pontos adicionados.")

            }

        })

    }
}