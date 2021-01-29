const Discord = require('discord.js')

module.exports = {
    name: "gerenciar",
    aliases: ["gerenciar", "configurar"],
    run: async (client, message, args, database) => {

        var embed = {
            title: "<:info:708048208932110487> ⋅ Você não inseriu o que deseja configurar.",
            description: "**Modulos disponiveis:** Salas/Cargos",
            color: "YELLOW"
        }
        if (!args[0]) return message.reply({ embed: embed })

        let format = args[0].toLowerCase()

        switch (format) {

            case "cargos":

                let cargos = []
                let searchRoles = await database.ref(`Colaborador/Beneficios/${message.author.id}/Cargos`).once('value')

                searchRoles.forEach(x => {

                    cargos.push({ cargo: x.key })

                })

                var embed = {
                    title: "💼 ⋅ Cargos",
                    description: `**${cargos.map(a => a.cargo).join("\n") || "Você não possui nenhum cargo."}**\n\nUse **c!gerenciar cargos (Nome do cargo)** para poder configurar seus cargos.`,
                    color: "YELLOW"
                }
                let name = args.slice(1).join(" ")
                if(!name) return message.reply({ embed: embed })

                let search = await database.ref(`Colaborador/Beneficios/${message.author.id}/Cargos/${name}`).once('value')
                
                var embed = {
                    title: `<:negativo:693945309063282728> ⋅ O cargo com o nome ${name} não existe.`,
                    color: "RED"
                }
                if(search.val() === null) return message.reply({ embed: embed })

                var embed = {
                    title: "💼 ⋅ Cargos.",
                    color: "YELLOW",
                    fields: [
                        {
                            name: "<:etiqueta:742845116309438610> ⋅ Renomear.",
                            value: "Altere o nome do seu cargo."
                        },
                        {
                            name: "<:info:708048208932110487> ⋅ Alterar cor.",
                            value: "Altere a cor do seu cargo."
                        },
                        {
                            name: "<a:money:712394003525402684> ⋅ Reembolso.",
                            value: "Peça o reembolso de seu cargo. (Taxa de 65%)"
                        }
                    ]
                }

                var men = await message.reply({ embed: embed }) 

                await men.react("742845116309438610")
                await men.react("708048208932110487")
                await men.react("712394003525402684")
                
                var filtro = (r, u) => r.me && u.equals(message.author)
                collector = men.createReactionCollector(filtro, { max: 1 })

                collector.on('collect', async (r) => {

                    switch (r.emoji.id) {

                        case "742845116309438610":

                            var embed = {
                                title: "<:etiqueta:742845116309438610> ⋅ Envie no chat local o nome que deseja colocar.",
                                color: "YELLOW"
                            }
                            var mensagem = await message.reply({ embed: embed })

                            var filtro = (m) => m.author.id === message.author.id;
                            collector = mensagem.channel.createMessageCollector(filtro, { max: 1 })

                            collector.on('collect', async (mensagem) => {

                                database.ref(`Colaborador/Beneficios/${message.author.id}/Cargos/${mensagem.content}`).set({
                                    name: mensagem.content,
                                    id: search.val().id
                                })

                                message.guild.roles.cache.get(search.val().id).edit({ name: mensagem.content })

                                var embed = {
                                    title: "<a:positivo:693579908324261918> ⋅ O seu cargo foi renomeado.",
                                    color: "GREEN"
                                }

                                message.reply({ embed: embed })

                                database.ref(`Colaborador/Beneficios/${message.author.id}/Cargos/${name}`).remove()

                            })

                        break;
                        case "708048208932110487":

                            var embed = {
                                title: "<:etiqueta:742845116309438610> ⋅ Envie no chat local a cor que deseja colocar. (Formato HEX)",
                                color: "YELLOW"
                            }
                            var mensagem = await message.reply({ embed: embed })

                            var filtro = (m) => m.author.id === message.author.id;
                            collector = mensagem.channel.createMessageCollector(filtro, { max: 1 })

                            collector.on('collect', async (mensagem) => {

                                message.guild.roles.cache.get(search.val().id).edit({ color: mensagem.content })

                                var embed = {
                                    title: "<a:positivo:693579908324261918> ⋅ A cor do seu cargo foi alterada com sucesso.",
                                    color: "GREEN"
                                }

                                message.reply({ embed: embed })

                            })

                        break;
                        case "712394003525402684":

                            var embed = {
                                title: `💰 ⋅ Você realmente deseja pedir um reembolso do cargo ${name}?`,
                                description: `Este item possue a taxa de 65% de reembolso, ou seja, você irá receber somente 14 pontos de volta.`,
                                color: "YELLOW"
                            }

                            var msg = await message.reply({ embed: embed })

                            await msg.react("💰")

                            var filtro = (r, u) => r.me && u.equals(message.author);
                            collector = msg.createReactionCollector(filtro, { max: 1 })

                            collector.on('collect', async (r) => {

                                let snap = await database.ref(`Colaborador/${message.author.id}`).once('value')
                                database.ref(`Colaborador/${message.author.id}`).update({
                                    pontos: snap.val().pontos + 14
                                })

                                message.guild.roles.cache.get(search.val().id).delete()

                                var embed = {
                                    title: "<a:positivo:693579908324261918> ⋅ Reembolso realizado com sucesso.",
                                    color: "GREEN"
                                }

                                database.ref(`Colaborador/Beneficios/${message.author.id}/Cargos/${name}`).remove()
                                message.reply({ embed: embed })

                            })


                        break;

                    }

                })


            break;

            case "salas":

                let salas = []
                let buscando = await database.ref(`Colaborador/Beneficios/${message.author.id}/Salas`).once('value')
                buscando.forEach(x => {

                    salas.push({ sala: x.key })

                })

                var embed = {
                    title: "👑 ⋅ Salas privadas.",
                    description: `**${salas.map(a => a.sala).join("\n") || "Você não possui nenhuma sala VIP."}**\n\nUse **c!gerenciar salas (Nome da sala)** para poder configurar a sala.`,
                    color: "YELLOW"
                }

                let nome = args.slice(1).join(" ")
                if (!nome) return message.reply({ embed: embed })

                let busca = await database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}`).once('value')

                var embed = {
                    title: `<:negativo:693945309063282728> ⋅ A sala vip ${nome} não existe.`,
                    color: "RED"
                }

                if (busca.val() === null) return message.reply({ embed: embed })

                var embed = {
                    title: "💰 ⋅ Selecione a configuração.",
                    fields: [
                        {
                            name: "<:etiqueta:742845116309438610> ⋅ Renomear.",
                            value: "Altere o nome da sua sala VIP."
                        },
                        {
                            name: "<:idka:722610509282541628> ⋅ Adicionar um membro.",
                            value: "Adicione um membro em sua sala VIP."
                        },
                        {
                            name: "<:staff:698324255724797952> ⋅ Remover um membro.",
                            value: "Remova um membro de sua sala VIP."
                        },
                        {
                            name: "<a:money:712394003525402684> ⋅ Reembolso.",
                            value: "Peça o reembolso de sua sala VIP. (Taxa de 65%)"
                        },
                        {
                            name: "<:info:708048208932110487> ⋅ Membros,",
                            value: "Visualize todos os membros que tem permissão em sua sala VIP."
                        }
                    ],
                    color: "YELLOW"
                }
                let msg = await message.reply({ embed: embed })

                await msg.react("742845116309438610")
                await msg.react("722610509282541628")
                await msg.react("698324255724797952")
                await msg.react("712394003525402684")
                await msg.react("708048208932110487")

                var filtro = (r, u) => r.me && u.equals(message.author)
                collector = msg.createReactionCollector(filtro, { max: 1 })

                collector.on('collect', async (r) => {

                    switch (r.emoji.id) {

                        case "742845116309438610":

                            var embed = {
                                title: "<:etiqueta:742845116309438610> ⋅ Envie no chat local o nome que deseja colocar.",
                                color: "YELLOW"
                            }
                            var mensagem = await message.reply({ embed: embed })

                            var filtro = (m) => m.author.id === message.author.id;
                            collector = mensagem.channel.createMessageCollector(filtro, { max: 1 })

                            collector.on('collect', async (mensagem) => {

                                database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${mensagem.content}`).set({
                                    name: mensagem.content,
                                    canal: busca.val().canal
                                })

                                message.guild.channels.cache.get(busca.val().canal).setName(mensagem.content)

                                var embed = {
                                    title: "<a:positivo:693579908324261918> ⋅ A sua sala vip foi renomeada.",
                                    color: "GREEN"
                                }

                                message.reply({ embed: embed })

                                database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}`).remove()

                            })

                            break;
                        case "722610509282541628":

                            var embed = {
                                title: "<:idka:722610509282541628> ⋅ Mencione no chat local o usuário que deseja adicionar.",
                                color: "YELLOW"
                            }
                            var mensagem = await message.reply({ embed: embed })

                            var filtro = (m) => m.author.id === message.author.id;
                            collector = mensagem.channel.createMessageCollector(filtro, { max: 1 })

                            collector.on('collect', async (mensagem) => {

                                var embed = {
                                    title: `<:negativo:693945309063282728> ⋅ Você não inseriu um membro válido.`,
                                    color: "RED"
                                }

                                let membro = mensagem.mentions.users.first()
                                if (!membro) return message.reply({ embed: embed })

                                let searchMember = await database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}/Membros/${membro}`).once('value')

                                if (searchMember.val() === null) {

                                    database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}/Membros/${membro}`).set({
                                        acesso: "Sim"
                                    })
                                    message.guild.channels.cache.get(busca.val().canal).updateOverwrite(membro.id, { "VIEW_CHANNEL": true, "CONNECT": true, "SPEAK": true, "STEAM": true })

                                    var embed = {
                                        title: "<a:positivo:693579908324261918> ⋅ O usuário foi adicionado com sucesso em sua sala VIP.",
                                        color: "GREEN"
                                    }
                                    message.reply({ embed: embed })

                                } else {

                                    var embed = {
                                        title: "<:negativo:693945309063282728> ⋅ O membro que você inseriu, já está liberado de acessar o canal.",
                                        color: "RED"
                                    }

                                }


                            })

                            break;
                        case "698324255724797952":

                            var embed = {
                                title: "<:idka:722610509282541628> ⋅ Mencione no chat local o usuário que deseja remover.",
                                color: "YELLOW"
                            }
                            var mensagem = await message.reply({ embed: embed })

                            var filtro = (m) => m.author.id === message.author.id;
                            collector = mensagem.channel.createMessageCollector(filtro, { max: 1 })

                            collector.on('collect', async (mensagem) => {

                                var embed = {
                                    title: `<:negativo:693945309063282728> ⋅ Você não inseriu um membro válido.`,
                                    color: "RED"
                                }

                                let membro = mensagem.mentions.users.first()
                                if (!membro) return message.reply({ embed: embed })

                                let searchMember = await database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}/Membros/${membro}`).once('value')

                                if (searchMember.val() === null) {

                                    var embed = {
                                        title: "<:negativo:693945309063282728> ⋅ O membro que você inseriu, não tem acesso a sua sala VIP.",
                                        color: "RED"
                                    }

                                } else {

                                    database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}/Membros/${membro}`).remove()

                                    message.guild.channels.cache.get(busca.val().canal).updateOverwrite(membro.id, { "VIEW_CHANNEL": true, "CONNECT": false, "SPEAK": false, "STEAM": false })

                                    var embed = {
                                        title: "<a:positivo:693579908324261918> ⋅ O usuário foi removido com sucesso da sua sala VIP.",
                                        color: "GREEN"
                                    }
                                    message.reply({ embed: embed })

                                }


                            })

                            break;
                        case "712394003525402684":

                            var embed = {
                                title: `💰 ⋅ Tem certeza que deseja realizar o reembolso da sala ${nome}?`,
                                description: "Este item possue a taxa de 65% de reembolso, ou seja, você irá receber somente 52 pontos de volta.",
                                color: "YELLOW"
                            }
                            let msg = await message.reply({ embed: embed })

                            await msg.react("💰")

                            var filtro = (r, u) => r.me && u.equals(message.author)
                            collector = msg.createReactionCollector(filtro, { max: 1 })

                            collector.on('collect', async (r) => {

                                let snap = await database.ref(`Colaborador/${message.author.id}`).once('value')
                                database.ref(`Colaborador/${message.author.id}`).update({
                                    pontos: snap.val().pontos + 52
                                })

                                message.guild.channels.cache.get(busca.val().canal).delete()

                                var embed = {
                                    title: "<a:positivo:693579908324261918> ⋅ Reembolso realizado com sucesso.",
                                    color: "GREEN"
                                }

                                database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}`).remove()
                                message.reply({ embed: embed })

                            })

                            break;
                        case "708048208932110487":

                            let membros = await database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${nome}/Membros`).once('value')
                            let result = []

                            membros.forEach(x => {

                                result.push({ membro: x.key })

                            })
                            var embed = {
                                title: "<:info:708048208932110487> ⋅ Membros.",
                                description: `${result.map(a => a.membro).join(", ") || "Só possui você com permissão de acesso"}.\n\nUse ** c!gerenciar salas ${nome}** e escolha a categoria "Adicionar membros" para adicionar novos membros em sua sala vip.Ou, escolha a categoria "Remover membros" para remover um membro da sala VIP.`,
                                color: "YELLOW"
                            }

                            message.reply({ embed: embed })

                            break;

                    }

                })

                break;

        }



    }
}