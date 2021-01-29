const Discord = require('discord.js')
const { inspect } = require('util')

module.exports = {
    name: 'eval',
    aliases: ['eval', 'terminal', 'cmd'],
    run: async(client, message, args, database) => {

        if(message.author.id != 414984935489667072) return message.reply("Somente desenvolvedores podem executar esse tipo de comandos.")
  
        const entrada = args.slice(0).join(" ");
        if(args[0] == "process.env.TOKEN") return message.reply("Está função foi bloqueada.")
        if(args[0] == "message.channel.send(process.env.TOKEN)") return message.reply("Está função foi bloqueada.")
        if(args[0] == "message.reply(process.env.TOKEN)") return message.reply("Está função foi bloqueada.")
        if(args[0] == "message.channel.send(`${process.env.TOKEN})") return message.reply("Está função foi bloqueada.")
        if(args[0] == "message.reply(${process.env.TOKEN})") return message.reply("Está função foi bloqueada.")
        if(!entrada) return message.reply("Insira o codigo.")

        try {

            var saida = eval(entrada)

            if(typeof saida !== "string") saida = inspect(saida)
            if(saida.size > 1950) saida = saida.substr(0, 1950)
            
            message.channel.send(`**Entrada:**\n\`\`\`${entrada}\`\`\`**Saida:**\n\`\`\`${saida}\n\`\`\``)

        } catch (err) {

            message.channel.send(`**Erro:**\n\`\`\`${err}\`\`\``)

        }

    }
}