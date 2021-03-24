const Discord = require('discord.js')

module.exports = {
    name: 'loja',
    aliases: ['loja', 'shop'],
    run: async (client, message, args, database) => {
    
        var emotes = ["813562954992975914", "813562955115135017", "813562955375181824", "813562955613470720", "813562955735367690", "813562957517946910", "813562957229064243", "813562957136658455", "813562957773537350", "813562956918423562"]
    
        async function verify(valor) {

            const snap = await database.ref(`Colaborador/${message.author.id}`).once('value')
            if(snap.val() === null) {

                var embed = {
                    title: ':moneybag: ⋅ Você não possui dinheiro o suficiente.',
                    color: 'RED'
                }

                message.reply({ embed: embed })

            } else {

                if(snap.val().pontos < valor) {
                
                    var embed = {
                        title: ':moneybag: ⋅ Você não possui dinheiro o suficiente.',
                        color: 'RED'
                    }

                    message.reply({ embed: embed })
                    return;

                }

            }

        }

        async function remove(valor) {

            const snap = await database.ref(`Colaborador/${message.author.id}`).once('value')

            database.ref(`Colaborador/${message.author.id}`).update({
                pontos: snap.val().pontos - valor
            })

        }

        var embed = {
            title: ':moneybag: ⋅ Seja bem vindo a loja de beneficios',
            description: `Seja bem vindo a nossa loja, aqui você pode comprar beneficios com **pontos.**\n⠀⠀`,
            fields: [
                {
                    name: '<:1_:813562954992975914> | Emojis externos',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:2_:813562955115135017> | Limpar as proprias advertências',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:3_:813562955375181824> | Limpar advertência de um usuário',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:4_:813562955613470720> | Tag compartilhada',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:5_:813562955735367690> | Area VIP',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:6_:813562957517946910> | Limpar advertências de um clã',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:7_:813562957229064243> | UNBAN',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
                {
                    name: '<:8_:813562957136658455> | Badge',
                    value: '```Está afim de poder usar emojis de outros servidores aqui? É sua chance!```'
                },
            ],
            image: {
                url: 'https://cdn.discordapp.com/attachments/803752710557794324/818961558478389289/advancement.png'
            },
            thumbnail: {
                url: 'https://media.discordapp.net/attachments/803752710557794324/818967629485703218/Cubic_Sun-1.png'
            },
            color: 'YELLOW'
        }

        var sucess = {
            title: ':moneybag: ⋅ Compra efetuada com sucesso',
            color: 'YELLOW'
        }

        var msg = await message.reply({ embed: embed })
        for(let i in emotes) msg.react(emotes[i])

        var filtro = (r, u) => u.id === message.author.id
        collector = msg.createReactionCollector(filtro, { max: 1 })

        collector.on('collect', async (r) => {

            switch(r.emoji.id) {

                case emotes[0]:

                    verify(40)
                    message.guild.channels.cache.array().forEach(x => {

                        x.updateOverwrite(message.author, { "USE_EXTERNAL_EMOJIS": true })

                    })

                    message.reply({ embed: sucess })
                    remove(40)

                break;
                case emotes[1]:
                break;
                case emotes[2]:
                break;
                case emotes[3]:
                break;
                case emotes[4]:
                break;
                case emotes[5]:
                break;
                case emotes[6]:
                break;
                case emotes[7]:
                break;
                case emotes[8]:
                break;
                case emotes[9]:
                break;

            }

        })

        /*<:1_:813562954992975914>
        <:2_:813562955115135017>
        <:3_:813562955375181824>
        <:4_:813562955613470720> 
        <:5_:813562955735367690> 
        <:6_:813562957517946910> 
        <:7_:813562957229064243> 
        <:8_:813562957136658455> 
        <:9_:813562957773537350> 
        <:10:813562956918423562>*/



    }
}