const Discord = require('discord.js')

module.exports = {
	name: 'registrarcla',
	aliases: ['registrarcla'],
	run: async (client, message, args, database) => {

		var erro = new Discord.MessageEmbed()
			.setTitle("<:erro:708058875986706495> ⋅ Você não tem permissão para utilizar este tipo de comando.")
			.setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
			.setColor("RED")

		if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply(erro)

		const cargo = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
		const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[3]));

		var erro = new Discord.MessageEmbed()
			.setTitle("<:erro:708058875986706495> ⋅ Você não insiriu o clã.")
			.setDescription("Você precisa adicionar a tag do clã que deseja registrar como parametro\n\nUse **c!registrarcla (Cargo do clã) (Tag do clã) (Dono)**")
			.setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
			.setColor("RED")

		if (!args[1]) return message.reply(erro)

		var erro = new Discord.MessageEmbed()
			.setTitle("<:erro:708058875986706495> ⋅ Você não insiriu um cargo valido.")
			.setDescription("Você precisa adicionar um cargo como parametro\n\nUse **c!registrarcla (Cargo do clã) (Tag do clã) (Dono)**")
			.setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
			.setColor("RED")

		if (!cargo) return message.reply(erro)

		var erro = new Discord.MessageEmbed()
			.setTitle("<:erro:708058875986706495> ⋅ Você não insiriu o dono do clã.")
			.setDescription(`Você precisa insirir o usuário que registrou este clã, eu aceito **__ID__** ou **__MENÇÃO__**\n\n**Use c!registrarcla ${cargo.name} ${args[1]} (Dono)**`)
			.setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
			.setColor("RED")

		if (!membro) return message.reply(erro)

		database.ref(`Clãs/CubicSun/${args[1]}`).once('value').then(async function (snap) {

			if (snap.val() === null) {

				database.ref(`Clãs/CubicSun/${args[1]}`).set({
					dono: membro.id,
					cargo: cargo.name,
					cargoid: cargo.id,
					p1: 0,
					p2: 0,
					p3: 0,
					p4: 0,
					p5: 0,
					p6: 0,
					p7: 0,
					p8: 0,
					p9: 0,
					foco: "Indefinido",
					desenvolvedor: "414984935489667072",
					joga: "Indefinido",
					limite: "0",
					recmsg: "Sabia que nossa loja parceira tem um site? Acesse https://storegalaxy.com.br",
					mensagem: "Minecraft Full, Spotify Permanente, Capa da optifine e muito mais, acesse https://storegalaxy.com.br",
					imagem: "https://cdn.discordapp.com/attachments/712137344286720041/731963820712525844/advancement.png",
					rec: "Não.",
					pt: 0,
					ptr: 0
				})

				var sucesso = new Discord.MessageEmbed()
					.setTitle("<:certo:708454422182625370> ⋅ O clã foi registrado com sucesso.")
					.setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
					.setColor("GREEN")

				message.reply(sucesso)

			} else {

				var erro = new Discord.MessageEmbed()
					.setTitle("<:erro:708058875986706495> ⋅ O clã já está registrado.")
					.setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
					.setColor("RED")

				message.reply(erro)

			}

		})
	}
}