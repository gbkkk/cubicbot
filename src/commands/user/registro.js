const Discord = require('discord.js')

module.exports = {
    name: "registrar",
    aliases: ['registrar', 'registro'],
    run: async(client, message, args, database) => {

        var erro = {
            color: "RED",
            title: "<:erro:708058875986706495> ⋅ Você não inseriu seu nickname do Minecraft."
        }

        let nick = args[0]
        if(!nick) return message.reply({ embed: erro })
        
        database.ref(`Usuários/Registro/${message.author.id}`).once('value').then(async function (snap) {

            if(snap.val() === null) {

                database.ref(`Usuários/Nicks/${nick}`).once('value').then(async function (user) {

                    if(user.val() === null) {

                        database.ref(`Usuários/Registro/${message.author.id}`).set({
                            fav: "Indefinido.",
                            mvp: 0,
                            imagem: "https://cdn.discordapp.com/attachments/712137344286720041/731203439241199767/advancement.png",
                            nick: nick,
                            joga: "indefinido.",
                            mensagem: "Sabia que você a nossa loja parceira **StoreGalaxy** está com uma super promoção? Veja em **https://storegalaxy.com.br**, e corra é por tempo limitado. Altere essa mensagem utilizando **c!userconfig**"
                        })

                        database.ref(`Usuários/Nicks/${nick}`).set({
                            nick: nick
                        })

                        var sucesso = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Você foi registrado com sucesso."
                        }

                        message.reply({ embed: sucesso })

                    } else {

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Já existe um usuário registrado com esse nickname, caso ele seja seu, chame o gb.#0001."
                        }

                        message.reply({ embed: erro })

                    }

                })

            } else {

                var erro = {
                    color: "RED",
                    title: "<:erro:708058875986706495> ⋅ Você já está registrado."
                }

                message.reply({ embed: erro })

            }

        })

    }
}