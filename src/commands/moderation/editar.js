const Discord = require('discord.js')

module.exports = {
    name: 'edit',
    aliases: ['editar'],
    category: 'Moderação',
    run: async(client, message, args, database) => {

        if(!message.member.hasPermission('BAN_MEMBERS')) return message.reply('É necessário ter a permissão de banir membros para poder editar uma punição.')

        var msg = await message.reply('Qual é o ID da punição que deseja editar?')
        var filtro = (m) => m.author.id === message.author.id 

        collector = msg.channel.createMessageCollector(filtro, { max: 1 })
        collector.on('collect', async (msg) => {

            let snap = await database.ref(`Regras/${msg.content}`).once('value')
            if(snap.val() === null) {

                message.reply(`O id ${msg.content} não corresponde a nenhuma punição existente.`)

            } else {

                var embed = {
                    title: '📋 ⋅ Edições.',
                    fields: [
                        {
                            name: '<:name:797265157112987648> ⋅ Nome.',
                            value: 'Edite o nome desta permissão.'
                        },
                        {
                            name: '<:limit:797265150360944680> ⋅ Limite.',
                            value: 'Aumente/diminua o limite de advertências permitidas nessa punição.'
                        },
                        {
                            name: '<:mute:797265155204710441> ⋅ Mute.',
                            value: 'Adicione **Silenciamento** nessa punição.'
                        },
                        {
                            name: '<:kick:797265148632104991> ⋅ Kick.',
                            value: 'Adicione **Expulsão** nessa punição.'
                        },
                        {
                            name: '<:ban:797265147311161345> ⋅ Banimento.',
                            value: 'Adicione **Banimento** nessa punição.'
                        },
                        {
                            name: '<:delete:797265370918158387> ⋅ Delete.',
                            value: 'Delete essa punição, essa ação não é irreversivel.'
                        },
                    ],
                    color: 'YELLOW',
                    image: {
                        url: 'https://cdn.discordapp.com/attachments/737866142143741963/797267292609839114/advancement.png'
                    }
                }

                var msg1 = await message.reply({ embed: embed })

                var emotes = [
                    "797265157112987648",
                    "797265150360944680", 
                    "797265155204710441", 
                    "797265148632104991", 
                    "797265147311161345", 
                    "797265370918158387"
                ]

                for(let i in emotes) msg1.react(emotes[i])

                var filtro = (r, u) => u.id === message.author.id
                collector = msg1.createReactionCollector(filtro, { max: 1 })

                collector.on('collect', async (r) => {

                    switch(r.emoji.id) {

                        case emotes[0]:

                            var msg2 = await message.reply('Qual é o novo nome?')
                            var filtro = (m) => m.author.id === message.author.id 

                            collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                            collector.on('collect', async(msg2) => {

                                database.ref(`Regras/${msg.content}`).update({
                                    nome: msg2.content
                                })

                                message.reply('Nome da punição foi alterado com sucesso.')

                            })

                        break;
                        case emotes[1]:

                            var msg2 = await message.reply('Qual é o novo limite?')
                            var filtro = (m) => m.author.id === message.author.id 

                            collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                            collector.on('collect', async (msg2) => {

                                if(isNaN(msg2.content)) return message.reply('Insira um número válido como limite.')

                                database.ref(`Regras/${msg.content}`).update({
                                    limite: Number(msg2.content)
                                })

                                message.reply('O limite da punição foi alterado com sucesso.')

                            })

                        break;
                        case emotes[2]:

                            var msg2 = await message.reply('Qual é o tempo de mute?')
                            var filtro = (m) => m.author.id === message.author.id 
                            
                            collector = msg.channel.createMessageCollector(filtro, { max: 1 })
                            collector.on('collect', async (msg2) => {

                                database.ref(`Regras/Punições/Mute`).set({
                                    
                                })

                            })

                        break;

                    }

                })

            }

        })

    }
}