const Discord = require('discord.js')

module.exports = {
    name: 'configclã',
    aliases: ['configclã', 'configcla', 'cf', 'claconfig'],
    run: async (client, message, args, database) => {

        let membro = []

        var embed = {
            color: "RED",
            name: "<:erro:708058875986706495> ⋅ Você não inseriu a tag do clã que deseja visualizar as informações."
        }

        if (!args[0]) return message.reply({ embed: embed })

        let format = args[0].toLowerCase()

        database.ref(`Clãs/CubicSun/${format}`).once('value').then(async function (snap) {

            if (snap.val() === null) {

                var embed = {
                    color: "RED",
                    title: `<:erro:708058875986706495> ⋅ O clã ${args[0]} não existe, ou não está registrado.`
                }

                message.reply({ embed: embed })


            } else {

                let donos = []
                const ref = await database.ref(`Clãs/CubicSun/${format}/Donos`).once('value')

                ref.forEach(x => {

                    donos.push({ donos: x.key })

                })
                let perm = false;

                if (snap.val().dono === message.author.id) perm = true
                if (message.member.roles.cache.has("688208342157361189")) perm = true

                var embed = {
                    color: "RED",
                    title: "<:erro:708058875986706495> ⋅ Você não possui a posse principal desse clã."
                }

                if (perm == false) return message.reply({ embed: embed })

                switch (args[1]) {

                    case 'donos':

                        switch (args[2]) {

                            case 'adicionar':

                                var embed = {
                                    color: "RED",
                                    title: "<:erro:708058875986706495> ⋅ Você não inseriu o membro."
                                }

                                membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
                                if (!membro) return message.reply({ embed: embed })

                                database.ref(`Clãs/CubicSun/${format}/Donos/${membro}`).set({
                                    dono: membro.id
                                })

                                membro.roles.add("717809608902836355")

                                var embed = {
                                    color: "GREEN",
                                    title: `<:certo:708454422182625370> ⋅ ${membro.user.username} foi adicionado com sucesso.`
                                }

                                message.reply({ embed: embed })

                                break;
                            case 'remover':

                                var embed = {
                                    color: "RED",
                                    title: "<:erro:708058875986706495> ⋅ Você não inseriu o membro."
                                }

                                membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[1]))
                                if (!membro) return message.reply({ embed: embed })

                                database.ref(`Clãs/CubicSun/${format}/Donos/${membro}`).once('value').then(async function (user) {

                                    if (user.val() === null) {

                                        let embed = {
                                            color: "RED",
                                            title: "<:erro:708058875986706495> ⋅ O usuário não está como dono no seu clã."
                                        }

                                        message.reply({ embed: embed })

                                    } else {

                                        membro.roles.remove("717809608902836355")

                                        database.ref(`Clãs/CubicSun/${format}/Donos/${membro}`).remove()

                                        let embed = {
                                            color: "GREEN",
                                            title: `<:certo:708454422182625370> ⋅ ${membro.user.username} foi removido com sucesso.`
                                        }

                                        message.reply({ embed: embed })

                                    }

                                })


                                break;
                            default:

                                var embed = {
                                    color: "RED",
                                    title: "<:erro:708058875986706495> ⋅ Você não adicionou se quer remover/adicionar um membro como dono."
                                }

                                message.reply({ embed: embed })
                                break;

                        }

                        break;
                    case 'rec':

                        if (snap.val().rec === "Não.") {

                            database.ref(`Clãs/CubicSun/${format}`).update({
                                rec: "Sim."
                            })

                            var embed = {
                                color: "GREEN",
                                title: `<:certo:708454422182625370> ⋅ ${message.guild.roles.cache.get(snap.val().cargoid).name} está recrutando agora.`
                            }

                            message.reply({ embed: embed })
                        }
                        if (snap.val().rec === "Sim.") {

                            database.ref(`Clãs/CubicSun/${format}`).update({
                                rec: "Não."
                            })

                            var embed = {
                                color: "GREEN",
                                title: `<:certo:708454422182625370> ⋅ ${message.guild.roles.cache.get(snap.val().cargoid).name} não está recrutando agora.`
                            }

                            message.reply({ embed: embed })
                        }

                        break;
                    case 'limite':

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu o número que deseja colocar como limite de vagas."
                        }

                        if (!args[2]) return message.reply({ embed: embed })

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Limite de caracteres atingido, insira o limite de menos de 3 carateres."
                        }

                        if (args[2].length > 3) return message.reply({ embed: embed })
                        database.ref(`Clãs/CubicSun/${format}`).update({
                            limite: args[2]
                        })

                        var embed = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ O limite de vagas foi alterado com sucesso."
                        }

                        message.reply({ embed: embed })


                        break;
                    case 'mensagem':

                        let mensagem = args.slice(2).join(" ")

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu a mensagem."
                        }

                        if (!mensagem) return message.reply({ embed: embed })

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Limite de caracteres atingido, insira uma mensagem a baixo de 500 caracteres."
                        }

                        if (mensagem.length > 500) return message.reply({ embed: embed })

                        database.ref(`Clãs/CubicSun/${format}`).update({
                            mensagem: mensagem
                        })

                        var embed = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Mensagem alterada com sucesso."
                        }

                        message.reply({ embed: embed })

                        break;
                    case 'requisitos':

                        let msg = args.slice(2).join(" ")

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu a mensagem."
                        }

                        if (!msg) return message.reply({ embed: embed })

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Limite de caracteres atingido, insira uma mensagem a baixo de 500 caracteres."
                        }

                        if (msg.length > 500) return message.reply({ embed: embed })

                        database.ref(`Clãs/CubicSun/${format}`).update({
                            recmsg: msg
                        })

                        var embed = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Requisitos alterado com sucesso."
                        }

                        message.reply({ embed: embed })

                        break;
                    case 'imagem':

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu uma imagem válida."
                        }

                        let imagem = message.attachments.first()
                        if (!imagem) return message.reply({ embed: embed })

                        database.ref(`Clãs/CubicSun/${format}`).update({
                            imagem: imagem.url
                        })

                        var embed = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Imagem alterada com sucesso."
                        }

                        message.reply({ embed: embed })

                        break;
                    case 'foco':

                        let foco = args.slice(2).join(" ")

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu o minigame que o clã é focado."
                        }

                        if (!foco) return message.reply({ embed: embed })

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Limite de caracteres atingido, insira menos minigames."
                        }

                        if (foco.length > 100) return message.reply({ embed: embed })

                        database.ref(`Clãs/CubicSun/${format}`).update({
                            foco: foco
                        })

                        var embed = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Foco alterado com sucesso."
                        }

                        message.reply({ embed: embed })

                        break;
                    case 'joga':

                        let joga = args.slice(2).join(" ")

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Você não inseriu o servidor que o clã é focado."
                        }

                        if (!joga) return message.reply({ embed: embed })

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495> ⋅ Limite de caracteres atingido, insira menos servidores."
                        }

                        if (joga.length > 500) return message.reply({ embed: embed })

                        database.ref(`Clãs/CubicSun/${format}`).update({
                            joga: joga
                        })

                        var embed = {
                            color: "GREEN",
                            title: "<:certo:708454422182625370> ⋅ Servidor que mais joga alterado com sucesso."
                        }

                        message.reply({ embed: embed })

                        break;
                    default:

                        var embed = {
                            color: "RED",
                            title: "<:erro:708058875986706495>  ⋅ Você não inseriu um método de configuração.",
                            description: "Métodos disponiveis: **donos, rec, limite, mensagem, requisitos, foco, joga e imagem.**"
                        }

                        message.reply({ embed: embed })

                        break;

                }

            }
        })
    }
}