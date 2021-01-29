const Discord = require("discord.js")

module.exports = {
    name: "registro",
    aliases: ["registro"],
    run: async (client, message, args, database) => {
    
        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author.id)
        
        database.ref(`Usuários/Punições/${membro.id}`).once('value').then(async function (snap) {

            if(snap.val() === null) {

                message.reply('Você/Ele(a) não tem advertências.')

            } else {

                var list = []
                var confirm = false

                snap.forEach(x => {

                    database.ref(`Regras/${x.key}`).once('value').then(async function (ref) {

                        confirm = true
                        list.push(`Punição: ${ref.val().nome}, Advertências recebidas: ${x.val().quantidade}`)


                    })

                })

                setTimeout(() => {

                    if(confirm === true) {

                        var embed = {
                            title: `<:info:708048208932110487> ⋅ Punições.`,
                            description: list.join('\n'),
                            image: {
                                url: 'https://cdn.discordapp.com/attachments/737866142143741963/793598423294672896/advancement.png'
                            },
                            color: 'YELLOW'
                        }

                        message.reply({ embed: embed })

                    }

                }, 700)

            }

        })

    }
}