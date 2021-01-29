const Discord = require('discord.js')

module.exports = {
    name: 'punircla',
    aliases: ['punircla', 'pc'],
    run: async(client, message, args, database) => {

        var erro = new Discord.MessageEmbed()
        .setTitle("<:erro:708058875986706495> ⋅ Você não tem permissão para utilizar este comando")
        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
        .setColor("RED")

        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply(erro)

        var erro = new Discord.MessageEmbed()
        .setTitle("<:erro:708058875986706495> ⋅ Você não inseriu o clã.")
        .setDescription("Você precisa adicionar o clã como parametro.\n\nUse **c!pc (Clã)**")
        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
        .setColor("RED")

        if(!args[0]) return message.reply(erro)

        const argumento = args[0].toLowerCase()

        database.ref(`Clãs/CubicSun/${argumento}`).once('value').then(async function (snap) {
            if(snap.val() === null) {

                var erro = new Discord.MessageEmbed()
                .setTitle("<:erro:708058875986706495> ⋅ Este clã não está registrado.")
                .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                .setColor("RED")

                message.reply(erro)

            } else {

        var embed = new Discord.MessageEmbed()
        .setTitle("<:info:708048208932110487> ⋅ Lista de punições")
        .setDescription("<:puni1:697906138724827146> | Uso de cheat\n<:puni2:697906385014358067> | Deslogar em SS\n<:puni3:697906591621578784> | Desrespeito ao GC\n<:puni4:697906742847340554> | Toxidade em cxc\n<:puni5:697906874384777226> | Recusar SS\n<:puni6:697907017473589279> | Tentativa de bypass\n<:puni7:697907155973439570> | Alt em cxc\n<:puni8:697907334193610762>  | Anti-jogo\n<:puni9:697907442905907210> | Atrapalhar cxc")
        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
        .setColor("#fcf803")
        .setThumbnail("https://cdn.discordapp.com/attachments/688207381276000384/690612130822619136/CubicSun.png")

        message.reply(embed).then(async msg => {

            var emojis = [
                '697906138724827146',
                '697906385014358067',
                '697906591621578784',
                '697906742847340554',
                '697906874384777226',
                '697907017473589279',
                '697907155973439570',
                '697907334193610762',
                '697907442905907210'
            ]

            for(const i in emojis) await msg.react(emojis[i])
            var filtro = (r, u) => r.me && u.equals(message.author)
            collector = msg.createReactionCollector(filtro, { max: 1 })

            collector.on('collect', async (r) => {

                switch(r.emoji.id) {

                    case '697906138724827146': {//Uso de cheat

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Uso de cheat`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)

                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p1) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p1: adc
                        })

                        break;
                    }
                    case '697906385014358067': {//Deslogar durante screen-share

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Deslogar durante Screen-Share`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)

                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p2) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p2: adc
                        })

                        break;
                    }
                    case '697906591621578784': {//Desrespeito ao GC

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Desrespeito ao GC`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)

                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p3) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p3: adc
                        })

                        break;
                    }
                    case '697906742847340554': {//Toxidade em cxc

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Toxidade em cxc`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)

                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p4) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p4: adc
                        })

                        break;
                    }
                    case '697906874384777226': {//Recusar SS

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Recusar Screen-Share`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)
                        
                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p5) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p5: adc
                        })

                        break;
                    }
                    case '697907017473589279': {//Tentativa de bypass

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Tentativa de bypass`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)
                        
                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p6) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p6: adc
                        })
                        
                        break;
                    }
                    case '697907155973439570': {//Alt em cxc

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Alt em cxc`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)

                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p7) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p7: adc
                        })
                        
                        break;
                    }
                    case '697907334193610762': {//Anti-jogo

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Anti-jogo`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)
                        
                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p8) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p8: adc
                        })
                        
                        break;
                    }
                    case '697907442905907210': {//Atrapalhar cxc

                        var pn = new Discord.MessageEmbed()
                        .setTitle("<:ban:695386153636855848> | Punição.")
                        .addField("**<:staff:698324255724797952> Clã punido:**", args[0])
                        .addField("**<:owner:696084145927094363> Dono do clã:**", snap.val().dono)
                        .addField("**<:motivo:698324538227818556> Motivo:**", `Atrapalhar cxc`)
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("#fcf803")

                        let canal = message.guild.channels.cache.find(c => c.name === "📕・punições")
                        canal.send(pn)
                        
                        var sucesso = new Discord.MessageEmbed()
                        .setTitle("<:certo:708454422182625370> | O clã foi punido com sucesso.")
                        .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                        .setColor("GREEN")

                        message.reply(sucesso)

                        var adc = Number(snap.val().p9) + 1;

                        database.ref(`Clãs/CubicSun/${argumento}`).update({
                            p9: adc
                        })
                        
                        break;
                    }

                }

            })


        })
        }
    })

    }
}