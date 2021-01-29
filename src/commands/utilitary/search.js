const Discord = require('discord.js')

module.exports = {
    name: "searchnick",
    aliases: ["searchnick", "search"],
    run: async(client, message, args, database) => {

		const ref = await database.ref(`Usuários/Registro`).once('value')
		let array = []

		ref.forEach(x => {

            if(message.guild.members.cache.get(x.key)) {

                array.push({ nick: x.val().nick, id: x.key, tag: message.guild.members.cache.get(x.key).user.tag })

            } else {

                return;

            }
		})

		if(!args[0]) return message.reply('Insira o nick que deseja procurar.')

		if(array.map(a => a.nick).includes(args[0])) {

            array.map(a => {

                if(a.nick === args[0]) {

                    message.reply(`Informações deste usuário: ${a.tag}/${a.id}`)

                }

            })
            
		} else {

			message.reply('Você não inseriu nenhum nick valido.')

		}

	}
}