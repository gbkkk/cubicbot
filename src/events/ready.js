module.exports = (client) => {

    client.on('ready', async () => {

        console.log(` _____________________________________________`)
        console.log('|                                             |')
        console.log(`| Olá, estou online com atualmente ${client.commands.size} comando. |`)
        console.log(`|_____________________________________________|`)

        var embed = {
            author: {
                name: 'CubicSun ・ Atendimento',
                icon_url: client.guilds.cache.get('688195861318074406').iconURL()
                
            },
            description: "Olá, seja bem vindo ao nosso suporte. Ao clicar na reação que representa a categoria desejada, será aberto um chat privado com você e a nossa equipe para tratar do assunto desejado.\n\n:microphone2: **» Categorias.**\n\n> :tickets: **» Dúvidas.**\n> :person_bowing: **» Sugestões.**\n> :microphone2: **» Solicitar live.**\n> :eyes: **» Solicitar telagem.**\n> ⛔ **» Denúncia.**\n> 📰 **» Revisão.**\n\n:warning: **» Observações.**\n\nLembrando que, as regras também são válidas nos tickets. Trate o atendente com respeito assim como ele irá tratar você. Uso inadequado resultará em punição, não abra ticket para nada ou abra diversos tickets.",
            color: "YELLOW",
        }

        client.channels.cache.get('741829013416181770').bulkDelete(100)

        var msg = await client.channels.cache.get('741829013416181770').send({ embed: embed })

        var emotes = ["🎟️", "🙇", "🎙️", "👀", "⛔", "📰"]
        for(let i in emotes) msg.react(emotes[i])

        client.user.setActivity('Novidades estão por vir...', { type: 'WATCHING' })

    })

}