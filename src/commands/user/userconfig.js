const discord = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "userconfig",
    aliases: ["configuser", "userconfig", "uc"],
    run: async (client, message, args, database) => {

        database.ref(`Usuários/Registro/${message.author.id}`).once('value').then(async function (valor) {

            if (valor.val() === null) {

                var erro = {
                    color: "RED",
                    title: "<:erro:708058875986706495> ⋅ É necessário o registro para poder utilizar este comando."
                }

                message.reply({ embed: erro })

            } else {
                //if(!args[0]) return message.reply("Você não inseriu o método de configuração.\n\nMétodos disponiveis: **nick**, **imagem**, **mensagem**, e **minigame**.")

                switch (args[0]) {
                    case "nick":

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu o nick que deseja colocar."
                        }

                        if(!args[1]) message.reply({ embed: erro })

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ O maximo de caracteres para um nick é de 16."
                        }

                        if(args[1].length > 16) return message.reply({ embed: erro })

                        database.ref(`Usuários/Nicks/${args[1]}`).once('value').then(async function (nick) {

                            if (nick.val() === null) {

                                database.ref(`Usuários/Registro/${message.author.id}`).update({
                                    nick: args[1]
                                })

                                database.ref(`Logs/Users/${message.author.id}/${args[1]}`).set({
                                    nick: args[1],
                                    id: message.author.id,
                                    username: message.author.username,
                                    tag: message.author.tag,
                                    data: moment(new Date()).format("DD/MM/YYYY HH:mm")
                                })

                                database.ref(`Logs/Nicks/${args[1]}`).set({
                                    nick: args[1],
                                    id: message.author.id,
                                    username: message.author.username,
                                    tag: message.author.tag,
                                    data: moment(new Date()).format("DD/MM/YYYY HH:mm")
                                })

                                database.ref(`Usuários/Nicks/${args[1]}`).set({
                                    nick: args[1]
                                })

                                database.ref(`Usuários/Nicks/${valor.val().nick}`).remove()

                                var sucesso = {
                                    color: "GREEN",
                                    title: "<:certo:708454422182625370> ⋅ Nick alterado com sucesso, use **c!userinfo** para visualizar o resultado."
                                }

                                message.reply({ embed: sucesso })

                            } else {

                                var erro = {
                                    color: "RED",
                                    title: "<:erro:708058875986706495> ⋅ Um usuário já possui este nickname, caso ele seja seu, chame o gb.#0001."
                                }

                                message.reply({ embed: erro })

                            }
                        })


                        break;
                    case "minigame":

                           var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu nenhum minigame."
                        }

                        let minigame = args.slice(1).join(" ")
                        if (!minigame) return message.reply({ embed: erro })
                        
                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Os minigames ultrapassaram de 500 caracteres, logo serei incapaz de adicionar os minigames ao seu perfil."
                        }
                        
                        if (minigame.length > 500) return message.reply({ embed: erro })

                        database.ref(`Usuários/Registro/${message.author.id}`).update({
                            joga: minigame
                        })

                        var sucesso = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Minigame alterado com sucesso, use **c!userinfo** para visualizar o resultado."
                        }

                        message.reply({ embed: sucesso })

                        break;
                    case "mensagem":

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu nenhuma mensagem."
                        }

                        let mensagem = args.slice(1).join(" ")
                        if (!mensagem) return message.reply({ embed: erro })

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Sua mensagem ultrapassou de 500 caracteres, logo serei incapaz de adicionar a mensagem ao seu perfil."
                        }

                        if (mensagem.length > 500) return message.reply({ embed: erro })

                        database.ref(`Usuários/Registro/${message.author.id}`).update({
                            mensagem: mensagem
                        })

                        var sucesso = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Mensagem alterada com sucesso, use **c!userinfo** para visualizar o resultado."
                        }

                        message.reply({ embed: sucesso })

                        break;
                    case "imagem":

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu nenhuma imagem válida."
                        }

                        let imagem = message.attachments.first()
                        if (!imagem) return message.reply({ embed: erro })

                        database.ref(`Usuários/Registro/${message.author.id}`).update({
                            imagem: message.attachments.first().url
                        })

                        var sucesso = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Imagem alterada com sucesso, use **c!userinfo** para visualizar o resultado."
                        }

                        message.reply({ embed: sucesso })


                        break;
                    case "favorito":

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu o seu servidor favorito."
                        }
                        let fav = args.slice(1).join(" ")
                        if (!fav) return message.reply({ embed: erro })

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Seus servidores ultrapassaram de 500 caracteres, logo serei incapaz de adicionar o servidor ao seu perfil."
                        }

                        if (fav.length > 500) return message.reply({ embed: erro })

                        database.ref(`Usuários/Registro/${message.author.id}`).update({
                            fav: fav
                        })

                        var sucesso = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Servidor favorito alterado com sucesso, use **c!userinfo** para visualizar o resultado."
                        }

                        message.reply({ embed: sucesso })

                    break;
                    default:

                        var erro = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu o método de configuração.",
                            description: "Métodos disponiveis: **nick**, **imagem**, **mensagem**, **favorito** e **minigame**.",
                        }

                        message.reply({ embed: erro })
                        break;
                }
            }
        })
    }
}