const Discord = require('discord.js')

module.exports = {
	name: 'booster',
    aliases: ['booster'],
    run: async(client, message, args, database) => {
    
        if(message.author.id !== "414984935489667072") return message.reply('Só o gb tem essa permissão bobão.')
        
    	message.guild.roles.cache.get("688197237678932059").members.forEach(x => {
            
            message.author.send(x.id)
            
           	database.ref(`Colaborador/${x.id}`).once('value').then(async function (snap) {
                
                if(snap.val() === null) {
                    
                    database.ref(`Colaborador/${x.id}`).set({
                        p1: 0,
                        p2: 0,
                        p3: 0,
                        p4: 0,
                        p5: 0,
                        p6: 0,
                        p7: 0,
                        p8: 0,
                        pontos: Number(60)
                    })
                    
                } else {
                    
                    database.ref(`Colaborador/${x.id}`).update({
                        pontos: Number(snap.val().pontos + 60)
                    })
                    
                    
                }
                
            })
            
        })
        
        message.reply('Pontos setados.')
        
    
    }
}