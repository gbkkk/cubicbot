module.exports = async (client) => {

    const { database } = require('../services/database')

    let prefix = "c!"

    client.on('message', async (message) => {

        if(message.author.bot) return;
        if(!message.guild) return;
        if(!message.content.startsWith(prefix)) return;
    
        if(!message.member) return;
        if (!message.member) message.member = await message.guild.fetchMember()
        
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase()
        const dev = process.env.TOKEN
    
        
        if(cmd.length === 0) return;
    
        
        var command = client.commands.get(cmd)
        
        if(!command) command = client.commands.get(client.aliases.get(cmd))

        if(command) {
         
            const snap = await database.ref(`CubicSun/Configurações/Beta`).once('value')
            if(snap.val() === null) {

                command.run(client, message, args, database)

            } else {

                if(snap.val().beta == true) {

                    if(message.author.id == 414984935489667072) {
                        
                        command.run(client, message, args, database)
                        return;

                    }

                    var embed = {
                        title: '❎ ⋅ O gb.#0001 está programando o bot, no momento, todos os comandos estão desabilitados.',
                        color: 'YELLOW'
                    }
        
                    message.reply({ embed: embed })        

                } else {

                    command.run(client, message, args, database)

                }

            }

            
        }

        if(!command) {

            var embed = {
                title: '❎ ⋅ Verifique a sua escrita, o comando inserido não existe.',
                color: 'RED'
            }

            message.reply({ embed: embed })

        }

    })

}