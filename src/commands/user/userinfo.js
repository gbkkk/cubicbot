const Discord = require('discord.js')

module.exports = {
    name: "userinfo",
    aliases: ["infouser", "userinfo", "info", "u"],
    run: async (client, message, args, database) => {

        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))


        if (!membro) {

            database.ref(`Usuários/Registro/${message.author.id}`).once('value').then(async function (snap) {

                if (snap.val() === null) {

                    var erro = {
                        color: "RED",
                        title: "<:erro:708058875986706495> ⋅ Você não possui um registro, utilize **c!registrar (Seu nick no minecraft)** para completar um registro."
                    }

                    message.reply({ embed: erro })

                } else {

                    database.ref(`Usuários/Badges/${message.author.id}`).once('value').then(async function (ver) {

                        if(ver.val() === null) {
            
                            titulo = `<:info:708048208932110487> ⋅ Informações do usuário ${message.author.username}`
            
                        } else {
            
                            titulo = `<:info:708048208932110487> ⋅ Informações do usuário ${message.author.username} ${ver.val().emblema}`
            
                        }
            
                    })


                    const ref = await database.ref(`Clãs/CubicSun`).once('value')
                    const val = ref.val()
                    const map = Object.values(val).map(a => a.cargoid)

                    let referencia = await database.ref(`Punições/${message.author.id}`).once('value')
                    let valor = referencia.val()
                    let soma = []


                    if (valor === null) {

                        soma = 0

                    } else {

                        soma = valor.p1 + valor.p2 + valor.p3 + valor.p4 + valor.p5 + valor.p6 + valor.p7 + valor.p8 + valor.p9 + valor.p10

                    }

                    let roles = message.member.roles.cache.filter(a => map.includes(a.id))
                    let claATUAL = roles.first() || "Nenhum."
                    let jogaMAIS = []

                    if (snap.val().joga === "indefinido") {

                        jogaMAIS = "Use c!config para definir."

                    } else {

                        jogaMAIS = snap.val().joga

                    }
                    let especialidade = []

                    if (message.member.roles.cache.has("699810350425571348")) especialidade.push({ especialidade: "Defensor" })
                    if (message.member.roles.cache.has("699810343626735626")) especialidade.push({ especialidade: "Atacante" })
                    if (message.member.roles.cache.has("699810343639056394")) especialidade.push({ especialidade: "Coringa" })
                    if (message.member.roles.cache.has("699810347154145350")) especialidade.push({ especialidade: "Tanker" })

                    let claPRO = [];
                    if (message.member.roles.cache.has("688425358722072670")) {

                        claPRO = "Sim."
                        claATUAL = "Nenhum."

                    } else {

                        claPRO = "Não"

                    }

                    var embed = {
                        color: "fcf803",
                        thumbnail: {
                            url: `https://mc-heads.net/combo/${snap.val().nick}`,
                        },
                        title: titulo,
                        description: `<a:pikachu_minecraft:731205049253888041> » **Nickname in-game:** ${snap.val().nick}\n🛡️ » **Tag:** ${message.author.tag}/${message.author.id}\n\n🤔 » **Está procurando clã:** ${claPRO}\n<a:minecraft:693584504576671885> » **Clã atual:** ${claATUAL}\n\n📖 » **Especialidade:** ${especialidade.map(e => e.especialidade).join(", ")}.\n🕹️ » **Joga mais:** ${jogaMAIS}\n🎮 » **Servidor favorito:** ${snap.val().fav}\n\n⚠️ » **Quantidade de punições:** ${soma}/4\n\n💬 » **Mensagem:** ${snap.val().mensagem}`,
                        image: {
                            url: snap.val().imagem
                        }
                    }
                    message.reply({ embed: embed })

                }
            })
        } else {

            database.ref(`Usuários/Registro/${membro.id}`).once('value').then(async function (snap) {

                if (snap.val() === null) {

                    message.reply(`**${membro.user.username}** não possui um registro.`)

                } else {

                    let titulo = []

                    database.ref(`Usuários/Badges/${membro.id}`).once('value').then(async function (ver) {

                        if(ver.val() === null) {
            
                            titulo = `<:info:708048208932110487> ⋅ Informações do usuário ${membro.user.username}`
            
                        } else {
            
                            titulo = `<:info:708048208932110487> ⋅ Informações do usuário ${membro.user.username} ${ver.val().emblema}`
            
                        }
            
                    })

                    const ref = await database.ref(`Clãs/CubicSun`).once('value')
                    const val = ref.val()
                    const map = Object.values(val).map(a => a.cargoid)

                    let roles = membro.roles.cache.filter(a => map.includes(a.id))
                    let claATUAL = roles.first() || "Nenhum."
                    let jogaMAIS = []

                    let referencia = await database.ref(`Punições/${membro.id}`).once('value')
                    let valor = referencia.val()
                    let soma = []

                    if (valor === null) {

                        soma = 0

                    } else {

                        soma = valor.p1 + valor.p2 + valor.p3 + valor.p4 + valor.p5 + valor.p6 + valor.p7 + valor.p8 + valor.p9 + valor.p10

                    }

                    if (snap.val().joga === "indefinido") {

                        jogaMAIS = "O usuário não definiu."

                    } else {

                        jogaMAIS = snap.val().joga

                    }


                    let especialidade = []

                    if (membro.roles.cache.has("699810350425571348")) especialidade.push({ especialidade: "Defensor" })
                    if (membro.roles.cache.has("699810343626735626")) especialidade.push({ especialidade: "Atacante" })
                    if (membro.roles.cache.has("699810343639056394")) especialidade.push({ especialidade: "Coringa" })
                    if (membro.roles.cache.has("699810347154145350")) especialidade.push({ especialidade: "Tanker" })

                    let claPRO = [];
                    if (message.member.roles.cache.has("688425358722072670")) {

                        claPRO = "Sim."
                        claATUAL = "Nenhum."

                    } else {

                        claPRO = "Não"

                    }

                    var embed = {
                        color: "fcf803",
                        thumbnail: {
                            url: `https://mc-heads.net/combo/${snap.val().nick}`,
                        },
                        title: titulo,
                        description: `<a:pikachu_minecraft:731205049253888041> » **Nickname in-game:** ${snap.val().nick}\n🛡️ » **Tag:** ${membro.user.tag}/${membro.id}\n\n🤔 » **Está procurando clã:** ${claPRO}\n<a:minecraft:693584504576671885> » **Clã atual:** ${claATUAL}\n\n📖 » **Especialidade:** ${especialidade.map(e => e.especialidade).join(", ")}.\n🕹️ » **Joga mais:** ${jogaMAIS}\n🎮 » **Servidor favorito:** ${snap.val().fav}\n\n⚠️ » **Quantidade de punições:** ${soma}/4\n\n💬 » **Mensagem:** ${snap.val().mensagem}`,
                        image: {
                            url: snap.val().imagem,
                        }
                    }
                    message.reply({ embed: embed })

                }
            })

        }
    }
}