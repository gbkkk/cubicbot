const Discord = require('discord.js')

module.exports = {
    name: 'transferencia',
    aliases: ['transferencia', 't', 'transfer'],
    run: async (client, message, args, database) => {


        message.reply("Hmmm, você me parece mal acostumado... Triste, não? <:idka:722610509282541628>")

        /*

        database.ref(`Colaborador/${message.author.id}`).once('value').then(async function (snap) {

            const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))
            const quantia = args[1];

            if (snap.val() === null) {

                var erro = new Discord.MessagEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui pontos suficiente para completar essa transação.")
                    .setColor("RED")

                message.reply(erro)

            } else {

                var erro = new Discord.MessageEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Você não inseriu o membro que deseja realizar a transação.")
                    .setColor("RED")

                if (!membro) return message.reply(erro)

                var erro = new Discord.MessageEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Este membro não é um colaborador, portanto serei incapaz de completar a transação.")
                    .setColor("RED")

                if (!membro.roles.cache.some(r => ["💰・Colaborador"].includes(r.name))) return message.reply(erro)

                var erro = new Discord.MessageEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Você não é um colaborador, portanto serei incapaz de completar a transação.")
                    .setColor("RED")

                if (!message.member.roles.cache.some(r => ["💰・Colaborador"].includes(r.name))) return message.reply(erro)

                var erro = new Discord.MessageEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Você não inseriu a quantidade de pontos que deseja transferir.")
                    .setColor("RED")

                if (!quantia) return message.reply(erro)

                var erro = new Discord.MessageEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Você não inseriu a quantidade de pontos que deseja transferir.")
                    .setColor("RED")

                if (isNaN(quantia)) return message.reply(erro)

                var erro = new Discord.MessageEmbed()
                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui pontos suficiente para completar essa transação.")
                    .setColor("RED")

                if (quantia > snap.val().pontos) return message.reply(erro)

                var erro = new Discord.MessageEmbed(erro)
                    .setTitle("<:erro:708058875986706495> ⋅ A quantidade minima para uma transferencia é de 15 pontos.")
                    .setDescription("**__Observação:__** as transações possui uma taxa de 15 pontos, ou seja se você doar 16 o usuário irá receber somente 1 ponto.")
                    .setColor("RED")

                if (quantia <= 15) return message.reply(erro)

                let adc = Number(quantia) - Number(15);
                let sub = Number(snap.val().pontos) - quantia

                database.ref(`Colaborador/${message.author.id}`).update({
                    pontos: sub
                })

                database.ref(`Colaborador/${membro.id}`).once('value').then(async function (snape) {

                    if (snape.val() === null) {

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            p8: 0,
                            pontos: adc
                        })

                        var transfer = new Discord.MessageEmbed()
                            .setTitle("💰 ⋅ Transação efetuada com sucesso.")
                            .setColor("#fcf803")

                        message.reply(transfer)

                    } else {

                        let adicionando = Number(snape.val().pontos) + Number(adc)

                        database.ref(`Colaborador/${membro.id}`).update({
                            pontos: adicionando
                        })

                        var transfer = new Discord.MessageEmbed()
                            .setTitle("💰 ⋅ Transação efetuada com sucesso.")
                            .setColor("#fcf803")

                        message.reply(transfer)

                    }

                })





            }

        })*/

    }
}