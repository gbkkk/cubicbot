const Discord = require('discord.js')

module.exports = {
	name: 'clainfo',
	aliases: ['clainfo', 'infocla'],
	run: async(client, message, args, database) => {

		if (!args[0]) return message.reply("Você não inseriu a tag.")
        let tag = args[0].toLowerCase()

        database.ref(`Clãs/CubicSun/${tag}`).once('value').then(async function (snap) {

            if (snap.val() === null) {

                message.reply("Este clã não está registrado.")

            } else {

                let donos = []
                const ref = await database.ref(`Clãs/CubicSun/${tag}/Donos`).once('value')

                ref.forEach(x => {

                    donos.push({ donos: x.key })

                })
                let soma = snap.val().p1 + snap.val().p2 + snap.val().p3 + snap.val().p4 + snap.val().p5 + snap.val().p6 + snap.val().p7 + snap.val().p8 + snap.val().p9
                let embed = {
                    color: "fcf803",
                    image: {
                        url: snap.val().imagem,
                    },
                    title: `<:info:708048208932110487> ⋅ Informações do clã ${message.guild.roles.cache.get(snap.val().cargoid).name}`,
                    description: `📖 » **Nome do clã:** ${message.guild.roles.cache.get(snap.val().cargoid).name}.\n🙇 » **Tag do clã:** ${tag}.\n<:king:731641900423184475> » **Donos:** <@${snap.val().dono}> **(Dono principal)**, ${donos.map(a => a.donos).join(", ")}.\n\n🙅 » **Quantidade de membros:** ${message.guild.roles.cache.get(snap.val().cargoid).members.size}/${snap.val().limite}\n📚 » **Está recrutando:** ${snap.val().rec}\n\n🏆 » **Pontuação nas ranqueadas:** ${snap.val().ptr}\n<a:minecraft:693584504576671885> » **Pontuação global:** ${snap.val().pt}\n\n🕹️ » **Clã focado em:** ${snap.val().foco}\n:video_game: » **Servidores que normalmente joga:** ${snap.val().joga}\n\n<:ban:695386153636855848> » **Registro de punições:**\n\n⚠️  » **Quantidade de punições:** ${soma}\n\n**Uso de cheat:** ${snap.val().p1}\n**Deslogar em SS:** ${snap.val().p2}\n**Desrespeito ao GC:** ${snap.val().p3}\n**Toxidade em cxc:** ${snap.val().p4}\n**Recusar SS:** ${snap.val().p5}\n**Tentativa de bypass:** ${snap.val().p6}\n**Alt em cxc:** ${snap.val().p7}\n**Anti-jogo:** ${snap.val().p8}\n**Atrapalhar cxc:** ${snap.val().p9}\n\n🤔 » **Requisitos:** ${snap.val().recmsg}\n\n💬 » Mensagem: ${snap.val().mensagem}`
				}
				
                message.reply({ embed: embed })

            }
        })
	}
}