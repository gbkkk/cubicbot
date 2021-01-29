const Discord = require('discord.js')

module.exports = {
    name: 'loja',
    aliases: ['loja', 'shop'],
    run: async (client, message, args, owner, database) => {

        database.ref(`Colaborador/${message.author.id}`).once('value').then(async function (snap) {

            var embed = new Discord.MessageEmbed().setTitle("💰 ⋅ Loja colaboradores.").setColor("#fcf803").setDescription("Seja bem vindo a nossa loja, aqui você pode comprar coisas com **pontos.**\n\n**__O que seria pontos?__**\n\nOs pontos podem ser obtidos atraves de doações para nossa comunidade, doando produtos como crunchyroll, spotify, minecraft semi entre outros. Você irá obter pontos e com os pontos você poderá gastar como quiser nessa loja.\n\n**__Produtos:__**\n\n<:puni1:697906138724827146> | Emojis externos - 10 Pontos;\n<:puni2:697906385014358067> | Imagens no chat - 20 Pontos;\n<:puni3:697906591621578784> | Limpar as proprias advertencias - 40 Pontos;\n<:puni4:697906742847340554> | Limpar advertencias de um usuário - 60 Pontos;\n<:puni5:697906874384777226> | Tag personalizada - 60 Pontos;\n<:puni6:697907017473589279> | Area Vip - 80 Pontos;\n<:puni7:697907155973439570> | Limpar advertências de um clã - 100 Pontos;\n<:puni8:697907334193610762> | Unban - 140;\n<:puni9:697907442905907210> | Badge no c!userinfo - 10;\n\n**__Observações:__**\n\nAs advertências de um usuário só podem ser limpas 1 vez.\nClique no emoji que representa o produto para que possa comprar-lo.").setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif').setThumbnail("https://cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif?size=2048")

            var emojis = [
                "697906138724827146",
                "697906385014358067",
                "697906591621578784",
                "697906742847340554",
                "697906874384777226",
                "697907017473589279",
                "697907155973439570",
                "697907334193610762",
                "697907442905907210"
            ]

            message.reply(embed).then(async msg => {

                for (const i in emojis) await msg.react(emojis[i])

                let filtro = (r, u) => r.me && u.equals(message.author);
                collector = msg.createReactionCollector(filtro, { time: 3600000, max: 5 })

                collector.on('collect', async (r) => {

                    switch (r.emoji.id) {
                        case '697906138724827146': {

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 10) return message.reply(erro)

                                var canal = message.guild.channels.cache.find(c => c.name === "💬・chat")

                                await canal.updateOverwrite(message.author.id, { "USE_EXTERNAL_EMOJIS": true })

                                var embed = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                message.reply(embed)

                                var sub = Number(snap.val().pontos) - Number(10);

                                database.ref(`Colaborador/${message.author.id}`).update({
                                    pontos: sub
                                })

                                message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Usar emojis externos)`)

                            }


                            break;
                        }
                        case '697906385014358067': {

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 20) return message.reply(erro)

                                var canal = message.guild.channels.cache.find(c => c.name === "💬・chat")

                                await canal.updateOverwrite(message.author.id, { "ATTACH_FILES": true })

                                var embed = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                message.reply(embed)

                                var sub = Number(snap.val().pontos) - Number(20);

                                database.ref(`Colaborador/${message.author.id}`).update({
                                    pontos: sub
                                })

                                message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Imagens no bate-papo)`)

                            }

                            break;
                        }
                        case '697906591621578784': {

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 40) return message.reply(erro)

                                database.ref(`Punições/${message.author.id}`).remove()

                                var embed = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                message.reply(embed)

                                var sub = Number(snap.val().pontos) - Number(40);

                                database.ref(`Colaborador/${message.author.id}`).update({
                                    pontos: sub
                                })

                                message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Limpar as advertências de si mesmo)`)

                            }

                            break;
                        }
                        case '697906742847340554': {

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 60) return message.reply(erro)

                                var slc = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Digite no chat o ID do usuário que você quer remover as advertências.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                let msg = await message.reply(slc)
                                let filtro = (m) => m.author.id === message.author.id;
                                let mensagem = msg.content
                                collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                                collector.on('collect', async (msg) => {

                                    const membro = message.guild.members.cache.get(msg.content)

                                    var erro = new Discord.MessageEmbed()
                                        .setTitle("<:erro:708058875986706495> ⋅ Insira um usuário valido, execute o comando novamente e efetue a compra.")
                                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                        .setColor("RED")

                                    if (!membro) return message.reply(erro)

                                    database.ref(`Punições/${membro.id}`).once('value').then(async function (user) {

                                        if (user.val() === null) {

                                            var erro = new Discord.MessageEmbed()
                                                .setTitle("<:erro:708058875986706495> ⋅ Este usuário não possui advertências.")
                                                .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                                .setColor("RED")
                                            message.reply(erro)

                                        } else {

                                            database.ref(`Punições/${membro.id}`).remove()

                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                                .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                                .setColor("#fcf803")

                                            message.reply(embed)

                                            let sub = Number(snap.val().pontos) - Number(60)

                                            database.ref(`Colaborador/${message.author.id}`).update({
                                                pontos: sub
                                            })

                                            message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Limpar as advertências de um usuário)`)

                                        }

                                    })

                                })

                            }

                            break;
                        }
                        case '697906874384777226': {//5

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 60) return message.reply(erro)

                                var slt = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Digite no chat o nome do cargo.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                let filtro = (m) => m.author.id === message.author.id;
                                let msg = await message.reply(slt)

                                collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                                collector.on('collect', async (msg) => {

                                    var slt = new Discord.MessageEmbed()
                                        .setTitle("💰 ⋅ Digite a cor no chat em formato **HEX**")
                                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                        .setColor("#fcf803")

                                    let filtro = (m) => m.author.id === message.author.id;
                                    let msg1 = await message.reply(slt)

                                    collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                                    collector.on('collect', async (msg1) => {

                                        let cargo = await message.guild.roles.create({ data: { name: msg.content, color: msg1.content } })

                                        await message.member.roles.add(cargo)

                                        var embed = new Discord.MessageEmbed()
                                            .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                            .setColor("#fcf803")

                                        message.reply(embed)

                                        let sub = Number(snap.val().pontos) - Number(60)

                                        database.ref(`Colaborador/${message.author.id}`).update({
                                            pontos: sub
                                        })

                                        database.ref(`Colaborador/Beneficios/${message.author.id}/Cargos/${msg.content}`).set({
                                            name: msg.content,
                                            id: cargo.id,
                                            color: msg1.content
                                        })

                                        message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Tag personalizada)`)

                                    })

                                })
                            }

                            break;
                        }
                        case '697907017473589279': {//6

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 80) return message.reply(erro)

                                var slc = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Digite o nome que deseja no canal no chat.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                let msg = await message.reply(slc)
                                let filtro = (m) => m.author.id === message.author.id;
                                collector = msg.channel.createMessageCollector(filtro, { max: 1 })

                                collector.on('collect', async (msg) => {

                                    let canal = await message.guild.channels.create(msg.content, { type: 'voice' })
                                    await canal.updateOverwrite(message.author.id, { "CONNECT": true, "STREAM": true, "SPEAK": true });
                                    await canal.updateOverwrite(message.guild.roles.everyone, { "CONNECT": false, "VIEW_CHANNEL": false })

                                    await canal.setParent("707682145472086056")
                                    database.ref(`Colaborador/Beneficios/${message.author.id}/Salas/${msg.content}`).set({
                                        name: msg.content,
                                        canal: canal.id
                                    })

                                    var embed = new Discord.MessageEmbed()
                                        .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                        .setColor("#fcf803")

                                    message.reply(embed)

                                    let sub = Number(snap.val().pontos) - Number(80)

                                    database.ref(`Colaborador/${message.author.id}`).update({
                                        pontos: sub
                                    })

                                    message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Area VIP)`)

                                })

                            }
                            break;
                        }
                        case '697907155973439570': {//7

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 100) return message.reply(erro)

                                var slc = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Digite a tag do clã que deseje limpar as advertências.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                let msg = await message.reply(slc)
                                let filtro = (m) => m.author.id === message.author.id;
                                collector = msg.channel.createMessageCollector(filtro, { max: 1 })

                                collector.on('collect', async (msg) => {

                                    let argumento = msg.content.toLowerCase()

                                    database.ref(`Clãs/CubicSun/${argumento}`).once('value').then(async function (cla) {

                                        if (cla.val() === null) {

                                            var erro = new Discord.MessageEmbed()
                                                .setTitle("<:erro:708058875986706495> ⋅ Este clã não está registrado.")
                                                .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                                .setColor("RED")

                                            message.reply(erro)

                                        } else {

                                            database.ref(`Clãs/CubicSun/${argumento}`).update({
                                                p1: 0,
                                                p2: 0,
                                                p3: 0,
                                                p4: 0,
                                                p5: 0,
                                                p6: 0,
                                                p7: 0,
                                                p8: 0,
                                                p9: 0
                                            })

                                            var embed = new Discord.MessageEmbed()
                                                .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                                .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                                .setColor("#fcf803")

                                            message.reply(embed)

                                            let sub = Number(snap.val().pontos) - Number(100)

                                            database.ref(`Colaborador/${message.author.id}`).update({
                                                pontos: sub
                                            })
                                            message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Limpar as advertências de um clã)`)

                                        }

                                    })

                                })


                            }

                            break;
                        }
                        case '697907334193610762': {//8

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 140) return message.reply(erro)

                                var slc = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Digite o ID do usuário que você deseja desbanir.\n\nInsira e tenha a certeza que é o usuário e id certo.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                let msg = await message.reply(slc)
                                let filtro = (m) => m.author.id === message.author.id;
                                collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                                collector.on('collect', async (msg) => {

                                    var blacklistUsers = []
                                    var referencia = await database.ref(`Blacklist`).once('value')

                                    referencia.forEach(x => {
                                        blacklistUsers.push({ membro: x.key })
                                    })

                                    if (blacklistUsers.map(a => a.membro).includes(msg.content)) return message.reply("O usuário mencionado está na blacklist, você não pode desbanir-lo.")

                                    await message.guild.members.unban(msg.content)

                                    database.ref(`Punições/${msg.content}`).set({
                                        p1: 3,
                                        p2: 0,
                                        p3: 0,
                                        p4: 0,
                                        p5: 0,
                                        p6: 0,
                                        p7: 0,
                                        p8: 0,
                                        p9: 0,
                                        p10: 0
                                    })

                                    var embed = new Discord.MessageEmbed()
                                        .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                        .setColor("#fcf803")

                                    message.reply(embed)

                                    let sub = Number(snap.val().pontos) - Number(140)

                                    database.ref(`Colaborador/${message.author.id}`).update({
                                        pontos: sub
                                    })

                                    message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Unban)`)

                                })

                            }

                            break
                        }
                        case "697907442905907210": {

                            if (snap.val() === null) {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                message.reply(erro)

                            } else {

                                var erro = new Discord.MessageEmbed()
                                    .setTitle("<:erro:708058875986706495> ⋅ Você não possui dinheiro suficiente para está transação.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("RED")

                                if (snap.val().pontos < 10) return message.reply(erro)

                                var slc = new Discord.MessageEmbed()
                                    .setTitle("💰 ⋅ Digite o emoji que deseja como badge.")
                                    .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                    .setColor("#fcf803")

                                let msg = await message.reply(slc)

                                let filtro = (m) => m.author.id === message.author.id;
                                collector = msg.channel.createMessageCollector(filtro, { max: 1 })

                                collector.on('collect', async (msg) => {

                                    var embed = new Discord.MessageEmbed()
                                        .setTitle("💰 ⋅ Transação efetuada com sucesso!")
                                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                                        .setColor("#fcf803")

                                    message.reply(embed)


                                    database.ref(`Usuários/Badges/${message.author.id}`).set({
                                        emblema: msg.content
                                    })

                                    var sub = Number(snap.val().pontos) - Number(10);

                                    database.ref(`Colaborador/${message.author.id}`).update({
                                        pontos: sub
                                    })

                                    message.guild.channels.cache.find(c => c.name === "💰・transações").send(`💰・**${message.author.username}/${message.author.id}** efetuou uma compra. (Badge)`)


                                })



                            }
                            break;
                        }
                    }

                })

            })
        })
    }
}