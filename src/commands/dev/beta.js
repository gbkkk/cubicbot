const Discord = require('discord.js')

module.exports = {
    name: 'beta',
    aliases: ['beta', 'alpha'],
    run: async(client, message, args, database) => {

        if(message.author.id != 414984935489667072) return message.reply('Só o autor do bot pode mexer neste comando.')

        const snap = await database.ref(`CubicSun/Configurações/Beta`).once('value')
        if(snap.val() === null) {

            database.ref(`CubicSun/Configurações/Beta`).set({
                beta: true
            })

            message.channel.send('Beta acabou de ser ligada, o bot permanecerá **indisponivel** para outros usuários.')

        } else {

            if(snap.val().beta == true) {

                database.ref(`CubicSun/Configurações/Beta`).update({
                    beta: false
                })
                
                message.channel.send('Beta acabou de ser desligada, o bot permanecerá **disponivel** para outros usuários.')


            } else {

                database.ref(`CubicSun/Configurações/Beta`).update({
                    beta: true
                })     

                message.channel.send('Beta acabou de ser ligada, o bot permanecerá **indisponivel** para outros usuários.')

            }

        }

    }
}