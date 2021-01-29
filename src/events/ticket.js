const Discord = require('discord.js')
const cooldown = new Set()

const firebase = require('firebase')
const database = firebase.database()

module.exports = async (client) => {

    client.on('messageReactionAdd', async (r, u) => {

        if (r.message.partial) await r.message.fetch()
        if (r.partial) await r.fetch()

        if (u.bot) return;

        async function ticket(name, react, role, title, start) {

            const snap = await database.ref(`CubicSun/Tickets`).once('value')

            if (snap.val() === null) {

                database.ref(`CubicSun/Tickets`).set({
                    atendidos: 0,
                    pendentes: 0
                })

            }

            const atendidos = snap.val().atendidos
            const pendentes = snap.val().pendentes

            if (r.message.channel.id == 741829013416181770) {

                if (cooldown.has(u.id)) {

                    await r.users.remove(u.id)
                    u.send('🎟️ ・ Ops, você tem que esperar 5 minutos antes de abrir outro ticket.').catch(err => { return });

                } else {

                    if (r.emoji.name === react) {

                        await r.users.remove(u.id)
                        cooldown.add(u.id)

                        var canal = await r.message.guild.channels.create(`${name.toLowerCase()}-${atendidos}`, { type: 'text', parent: '741828833510031390', reason: `Ticket-${atendidos}` })

                        canal.updateOverwrite(r.message.guild.roles.everyone, { "VIEW_CHANNEL": false })
                        canal.updateOverwrite(u.id, { "SEND_MESSAGES": true, "VIEW_CHANNEL": true, "ATTACH_FILES": false })

                        let mfiltro = (m) => m.author.id === u.id
                        let rfiltro = (reaction, user) => r.message.guild.members.cache.get(user.id).roles.cache.has("688213450308059147")

                        var embed = {
                            title: `${react} » ${title}`,
                            description: `Olá, **${u.username}** seja bem-vindo(a) ao nosso sistema de atendimento. Primeiro, para começarmos ${start}\n\n⚠️ ** » Observações.**\n\nCaso você não insira sua ${name.toLowerCase()} no prazo de 5 minutos, o canal será automaticamente deletado.\n\n🎟️ **» ${name}.**\`\`\`Não informado.\`\`\``,
                            color: 'YELLOW'
                        }

                        var msg = await canal.send({ embed: embed })
                        var confirm = false

                        canal.send(`${u}`).then(msg => msg.delete({ timeout: 5000 }))

                        mcollector = msg.channel.createMessageCollector(mfiltro, { max: 1 })
                        mcollector.on('collect', async (msg) => {

                            database.ref(`CubicSun/Tickets`).update({
                                pendentes: pendentes + 1
                            })

                            client.channels.cache.get('802695618069266452').edit({ name: `Tickets pendentes: ${pendentes + 1}` })

                            confirm = true
                            canal.updateOverwrite(r.message.guild.roles.cache.get(role), { "SEND_MESSAGES": true, "VIEW_CHANNEL": true })
                            canal.send(`<@&${role}>`).then(msg => msg.delete({ timeout: 5000 }))

                            canal.bulkDelete(100)

                            var embed = {
                                title: `${react} » ${title}`,
                                description: `**${u.username}**, Agradeço a sua colaboração, seja bem-vindo(a) a abrir outro ticket quando quiser. Agora só basta esperar algum staffer vir te atender, é rapidinho ;)\n\n⚠️ ** » Observações.**\n\nCaso você abriu este ticket para não falar sobre algo serio, você será punido de imediato.\n\n🎟️ **» ${name}.**\`\`\`${msg.content}\`\`\``,
                                color: 'YELLOW'
                            }

                            var msg = await canal.send({ embed: embed })
                            msg.react('🔒')

                            rcollector = msg.createReactionCollector(rfiltro)
                            rcollector.on('collect', async (r) => {

                                canal.send("🔒 ⋅ Estarei fechando este ticket dentro de 5 segundos.")
                                setTimeout(() => canal.delete(), 5000)

                                database.ref(`CubicSun/Tickets`).update({
                                    atendidos: Number(atendidos + 1)
                                })

                                database.ref(`CubicSun/Tickets`).update({
                                    pendentes: Number(pendentes)
                                })

                                client.channels.cache.get('802695456031375410').edit({ name: `Tickets atendidos: ${atendidos + 1}` })
                                await client.channels.cache.get('802695618069266452').edit({ name: `Tickets pendentes: ${pendentes}` })

                            })

                        })

                        setTimeout(() => {

                            cooldown.delete(u.id)

                            if (confirm == false) {

                                canal.delete()
                                u.send("🎟️ ・ Ops, o ticket que você abriu hoje foi finalizado. (Demora ao responder)").then(() => { return }).catch(err => { return });

                            }

                        }, 300000)

                    }

                }

            } else {

                return;

            }

        }

        ticket("Dúvida", "🎟️", "790900318086758410", "Dúvida", "insira sua dúvida enviando ela no chat local.")
        ticket("Sugestão", "🙇", "790900318086758410", "Sugestão", "insira sua sugestão enviando ela no chat local.")
        ticket("Solicitar Live", "🎙️", "790900318086758410", "Live", "insira a data da sua live enviando ela no chat local.")
        ticket("Solicitar telagem", "👀", "790900318086758410", "Solicitar-SS", "insira o nick do usuário suspeito enviando no chat local.")
        ticket("Denúncia", "⛔", "790900318086758410", "Denúncia", "insira o id do usuário e as provas enviando ela no chat local.")
        ticket("Revisão", "📰", "802713885824122951", "Revisão", "insira o motivo da sua revisão, e o por que deve ser aceita.")

    })

}