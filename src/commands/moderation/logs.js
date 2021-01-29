const Discord = require('discord.js')

module.exports = {
    name: 'logs',
    aliases: ['logs'],
    run: async (client, message, args, database) => {

        if(!message.member.hasPermission('MUTE_MEMBERS')) return message.reply('Você não tem permissão o suficiente para poder pegar o registro de todos os nicks do membro.')

        var msg = await message.reply('Você quer buscar as logs através de um nick ou usuário? **NICK/USER**')

        var filtro = (m) => m.author.id === message.author.id
        collector = msg.channel.createMessageCollector(filtro, { max: 1 })

        collector.on('collect', async (msg) => {

            switch(msg.content) {

                case "nick":
                
                    var msg1 = await message.reply('Qual é o nick que você deseja pesquisar?')

                    var filtro = (m) => m.author.id === message.author.id
                    collector = msg.channel.createMessageCollector(filtro, { max: 1 })
            
                    collector.on('collect', async (msg1) => {

                        database.ref(`Logs/Nicks/${msg1.content}`).once('value').then(async function (snap) {

                            if(snap.val() === null) {

                                message.reply('Você não inseriu nenhum nickname inválido.')

                            } else {


                                const ref = await database.ref(`Logs/Users/${snap.val().id}`).once('value')
                                let array = []
 
                                Object.values(ref.val()).map(x => {

                                    array.push({ id: x.id, username: x.username, tag: x.tag, nick: `${x.nick} - ${x.data}`, data: x.data })

                                })

                                var embed = {
                                    title: `<:info:708048208932110487> ⋅ Informações de ${array[0].tag}/${array[0].id}`,
                                    description: array.map(a => a.nick).join("**\n**"),
                                    color: "YELLOW"
                                }

                                message.reply({ embed: embed })

                            }

                        })

                    })


                break;
                case "user":

                    var msg1 = await message.reply('Qual é o usuário que você deseja pesquisar o registro de nicks?')

                    var filtro = (m) => m.author.id === message.author.id
                    collector = msg.channel.createMessageCollector(filtro, { max: 1 })
            
                    collector.on('collect', async (msg1) => {

                        var membro = message.guild.member(msg1.mentions.users.first() || message.guild.members.cache.get(msg1.content))
                        if(!membro) return message.reply('Você não inseriu nenhum membro válido.')

                        database.ref(`Logs/Users/${membro.id}`).once('value').then(async function (snap) {

                            if(snap.val() === null) {

                                message.reply('Este membro não possue registro.')


                            } else {

                                const ref = await database.ref(`Logs/Users/${membro.id}`).once('value')
                                let array = []
 
                                Object.values(ref.val()).map(x => {

                                    array.push({ id: x.id, username: x.username, tag: x.tag, nick: `${x.nick} - ${x.data}`, data: x.data })

                                })

                                var embed = {
                                    title: `<:info:708048208932110487> ⋅ Informações de ${array[0].tag}/${array[0].id}`,
                                    description: array.map(a => a.nick).join("**\n**"),
                                    color: "YELLOW"
                                }

                                message.reply({ embed: embed })

                            }

                        })    

                    })

                break;
                default:

                    message.reply('Você deve inserir somente **USER/NICK**')

                break;

            }

        })

    }
}