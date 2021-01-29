const Discord = require('discord.js')

module.exports = {
	name: 'searchowners',
    aliases: ['searchowners'],
    run: async(client, message, args, database) => {
    
        const role = message.mentions.roles.first()
    	if(!message.member.hasPermission("MUTE_MEMBERS")) return message.reply('É necessário ter um cargo maior que ajudante para utilizar este comando.')

        if(!role) return message.reply('Mencione o clã que deseja procurar os donos.')

        let array = []

        var msg = await message.reply('Procurando donos...')

        role.members.forEach(x => {

            if(message.guild.members.cache.get(x.id).roles.cache.has('717809608902836355')) {

                array.push({ nome: `${x.user.username} / ${x.user.tag}` })

            }

        })

        setTimeout(() => {

            var embed = {
                title: '<:info:708048208932110487> ⋅ Comandantes',
                description: `${array.map(a => a.nome).join('\n')}`,
                color: 'YELLOW'
            }
    
            msg.edit({ embed: embed })

        }, 1000)
    
    }
}