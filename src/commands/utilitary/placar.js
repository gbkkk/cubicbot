const Discord = require('discord.js')

module.exports = {
    name: "placar",
    aliases: ["placar"],
    run: async (client, message, args, database) => {

        let clasGet = []
        const ref = await database.ref(`Clãs/CubicSun`).once('value')

        ref.forEach(x => {

            clasGet.push({ nome: x.val().cargo, pontos: x.val().ptr, cla: x.val().cla })
        })

        clasGet.sort(function (a, b) { return b.pontos - a.pontos })

        var embed = {
            title: "<:info:708048208932110487> ⋅ Lista de clãs.",
            color: "fcf803",
            description: `**1° Lugar** - ${clasGet[0].nome} - **Pontuação:** ${clasGet[0].pontos} - **Está aceitando CxC:** ${clasGet[0].cla}\n**2° Lugar** - ${clasGet[1].nome} - **Pontuação:** ${clasGet[1].pontos} - **Está aceitando CxC:** ${clasGet[1].cla}\n**3° Lugar** - ${clasGet[2].nome} - **Pontuação:** ${clasGet[2].pontos} - **Está aceitando CxC:** ${clasGet[2].cla}\n**4° Lugar** - ${clasGet[3].nome} - **Pontuação:** ${clasGet[3].pontos} - **Está aceitando CxC:** ${clasGet[3].cla}\n**5° Lugar** - ${clasGet[4].nome} - **Pontuação:** ${clasGet[4].pontos} - **Está aceitando CxC:** ${clasGet[4].cla}\n**6° Lugar** - ${clasGet[5].nome} - **Pontuação:** ${clasGet[5].pontos} - **Está aceitando CxC:** ${clasGet[5].cla}\n**7° Lugar** - ${clasGet[6].nome} - **Pontuação:** ${clasGet[6].pontos} - **Está aceitando CxC:** ${clasGet[6].cla}\n**8° Lugar** - ${clasGet[7].nome} - **Pontuação:** ${clasGet[7].pontos} - **Está aceitando CxC:** ${clasGet[7].cla}\n**9° Lugar** - ${clasGet[8].nome} - **Pontuação:** ${clasGet[8].pontos} - **Está aceitando CxC:** ${clasGet[8].cla}\n**10° Lugar** - ${clasGet[9].nome} - **Pontuação:** ${clasGet[9].pontos} - **Está aceitando CxC:** ${clasGet[9].cla}\n\n<a:positivo:693579908324261918> Para a próxima página.`
        }
      
        let msg = message.reply({ embed: embed }).then(msg => msg.react("693579908324261918"))

        let filtro = (r, u) => r.me && u.equals(message.author);
        collector = msg.createReactionCollector(filtro, { max: 1, time: 3600000 })

        collector.on('collect', async (r) => {

            switch(r.emoji.id) { 
                
                case "693579908324261918":
                
                    var embed = {
                        title: "<:info:708048208932110487> ⋅ Lista de clãs.",
                        color: "fcf803",
                        description: `**11° Lugar** - ${clasGet[10].nome} - **Pontuação:** ${clasGet[10].pontos} - **Está aceitando CxC:** ${clasGet[10].cla}\n**12° Lugar** - ${clasGet[11].nome} - **Pontuação:** ${clasGet[11].pontos} - **Está aceitando CxC:** ${clasGet[11].cla}\n**13° Lugar** - ${clasGet[12].nome} - **Pontuação:** ${clasGet[12].pontos} - **Está aceitando CxC:** ${clasGet[12].cla}\n**14° Lugar** - ${clasGet[13].nome} - **Pontuação:** ${clasGet[13].pontos} - **Está aceitando CxC:** ${clasGet[13].cla}\n**15° Lugar** - ${clasGet[14].nome} - **Pontuação:** ${clasGet[14].pontos} - **Está aceitando CxC:** ${clasGet[14].cla}\n**16° Lugar** - ${clasGet[15].nome} - **Pontuação:** ${clasGet[15].pontos} - **Está aceitando CxC:** ${clasGet[15].cla}\n**17° Lugar** - ${clasGet[16].nome} - **Pontuação:** ${clasGet[16].pontos} - **Está aceitando CxC:** ${clasGet[16].cla}\n**18° Lugar** - ${clasGet[17].nome} - **Pontuação:** ${clasGet[17].pontos} - **Está aceitando CxC:** ${clasGet[17].cla}\n**19° Lugar** - ${clasGet[18].nome} - **Pontuação:** ${clasGet[18].pontos} - **Está aceitando CxC:** ${clasGet[18].cla}\n**20° Lugar** - ${clasGet[19].nome} - **Pontuação:** ${clasGet[19].pontos} - **Está aceitando CxC:** ${clasGet[19].cla}\n\n<a:positivo:693579908324261918> Para a próxima página.`
                        }
        
                    let msg = message.reply({ embed: embed }).then(msg => msg.react("693579908324261918"))
        
                    await msg.react("693579908324261918")
                

                break;
            }
        })

    }
}