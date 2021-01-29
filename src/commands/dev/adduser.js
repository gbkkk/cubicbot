const Discord = require('discord.js')

module.exports = {
    name: 'adduser',
    aliases: ['adduser'],
    run: async(client, message, args, database) => {

        database.ref(`CubicSun/App/Usuários/Gabriel`).set({
            senha: '123'
        })

        message.reply('foi')

    }
}