const Discord = require('discord.js')

module.exports = {
    name: 'help',
    aliases: ['ajuda', 'help'],
    run: async(client, message, args, database) => {

        var embed = {
            title: '<:info:708048208932110487> ⋅ Ajuda.',
            description: `**⚒️ Quantidade de comandos** ${client.commands.map(a => a.name).length}\n**👑 Desenvolvedor** <@414984935489667072>\n\n**🤖 Comandos** ${client.commands.map(a => a.name).join(', ')}`,
            color: 'YELLOW'
        }

        message.reply({ embed: embed })

    } 
}