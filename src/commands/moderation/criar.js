const Discord = require('discord.js')

module.exports = {
    name: 'criar',
    aliases: ['criar'],
    run: async(client, message, args, database) => {

        if(!message.member.hasPermission('ADMINISTRATOR')) return;

        var msg = await message.reply('Qual será o nome da punição?')
        
        var filtro = (m) => m.author.id === message.author.id
        collector = msg.channel.createMessageCollector(filtro, { max: 1 })

        collector.on('collect', async (msg) => {

            var msg1 = await message.reply('Qual será o tempo do primeiro mute?')
            collector = msg.channel.createMessageCollector(filtro, { max: 1 })

            collector.on('collect', async (msg1) => {

                var msg2 = await message.reply('Qual será o tempo do segundo mute?')
                collector = msg.channel.createMessageCollector(filtro, { max: 1 })
    
                collector.on('collect', async (msg2) => {
    
                    var msg3 = await message.reply('Qual será o tempo do terceiro mute?')
                    collector = msg.channel.createMessageCollector(filtro, { max: 1 })
        
                    collector.on('collect', async (msg3) => {
        
                        const somando = await database.ref(`Regras`).once('value')
                        var soma = 1
                        
                        somando.forEach(x => {

                            soma = soma + 1

                        })

                        database.ref(`Regras/${soma}`).set({
                            um: msg1.content,
                            dois: msg2.content,
                            tres: msg3.content,
                            nome: msg.content
                        })

                        var embed = {
                            title: '<a:positivo:693579908324261918> ⋅ Punição criada com sucesso.',
                            color: 'GREEN'
                        }

                        message.reply({ embed: embed })
                        
                    })
                    
                })

            })
            
        })
    
    }
}