const Discord = require('discord.js')

module.exports = {
    name: 'pontos',
    aliases: ['pontos'],
    run: async(client, message, args, database) => {

        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author);

        database.ref(`Colaborador/${membro.id}`).once('value').then(async function (snap) {

            if(snap.val() === null) {
                
                message.reply("Você não possui nenhum ponto em sua carteira.")

            } else {

            var embed = new Discord.MessageEmbed()
            .setTitle(`<a:money:712394003525402684> | Informações do usuário **__${membro.user.username}__**`)
            .setDescription(`Quantidade de produtos doados:\n\nCrunchyRoll: ${snap.val().p1}\nSpotify: ${snap.val().p2}\nMinecraft Semi Full: ${snap.val().p3}\nMinecraft Full Acesso: ${snap.val().p4}\nCapa da Optifine: ${snap.val().p5}\nNitro Classic: ${snap.val().p6}\nNitro Gaming: ${snap.val().p7}\n\nPontuação total: ${snap.val().pontos}`)
            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
            .setColor("#fcf803")

            message.reply(embed)

            }
        })

    }
}