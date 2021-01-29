const Discord = require('discord.js')

module.exports = {
    name: "blacklist",
    aliases: ["blacklist"],
    run: async(client, message, args, database) => {

        if(!message.member.hasPermission("ADMINISTRATOR")) return;
        if(!args[0]) return message.reply("Insira o nome do usuário que você deseja adicionar na blacklist")
        if(!args[1]) return message.reply("Insira o id do usuário que você deseja adicionar na blacklist")

        message.guild.channels.cache.get("713098965884731392").send(`> 🔪 **| ${args[0]} > ${args[1]}**`)
        message.reply("Usuário adicionado na blacklist.")

        database.ref(`Blacklist/${args[1]}`).set({
            usuário: args[1]
        })

    }
}