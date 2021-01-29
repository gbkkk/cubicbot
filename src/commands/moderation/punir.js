const Discord = require('discord.js')
const moment = require('moment')
const ms = require('ms')

module.exports = {
    name: 'punir',
    aliases: ['punir', 'p'],
    run: async(client, message, args, database) => {

        const provas = message.guild.channels.cache.get('711629718146777149')
        const puni = message.guild.channels.cache.get('688216772406804579')

        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply('sem perm')

        var msg = await message.reply('Insira a prova. **(Em forma de ATTACHMENT)**')

        var filtro = (m) => m.author.id === message.author.id
        collector = msg.channel.createMessageCollector(filtro, { max: 1 })

        collector.on('collect', async (msg) => {

            if(!msg.attachments.first()) return message.reply('Você não inseriu nenhuma imagem válida.')

            var msg1 = await message.reply('Insira o id do usuário. **(Em forma de ID)**')

            collector = msg.channel.createMessageCollector(filtro, { max: 1 })
            collector.on('collect', async (msg1) => {

              const membro = msg1.guild.member(msg1.mentions.users.first() || msg1.guild.members.cache.get(msg1.content));
              if(!membro) return message.reply('Você não inseriu nenhum usuário válido.')

              const puniSearch = await database.ref(`Regras`).once('value')
              var puniList = []

              puniSearch.forEach(x => {

                puniList.push({ ref: `${x.key} / ${x.val().nome}`, nome: x.val().nome, id: x.key })

              })

              var embed = {
                title: '<:info:708048208932110487> ⋅ Tabela de punições.',
                description: `${puniList.map(a => a.ref).join('\n')}\n\n**Envie o ID da punição no chat, para que o usuário seja punido.**`,
                image: {
                  url: 'https://cdn.discordapp.com/attachments/737866142143741963/779068694013018112/advancement.png'
                },
                color: 'YELLOW'
              }

              var msg2 = await message.reply({ embed: embed })

              collector = msg.channel.createMessageCollector(filtro, { max: 1 })
              collector.on('collect', async (msg2) => {

                database.ref(`Regras/${msg2.content}`).once('value').then(async snap => {

                  if(snap.val() === null) {

                    message.reply('Você não inseriu nenhum ID de punição válido.')

                  } else {

                    const user = await database.ref(`Usuários/Punições/${membro.id}`).once('value')
                    if(user.val() === null) {

                      database.ref(`Usuários/Punições/${membro.id}/${msg2.content}`).set({
                        quantidade: 1
                      })

                      membro.roles.add('691694828597149696')
                      database.ref(`Mute/${membro.id}`).set({
                        mute: 'Sim.'
                      })

                      provas.send(`**ID do usuário punido:** ${membro.user.tag}/${membro.id}\n**ID do staff que puniu:** ${message.author.tag}/${message.author.id}\n\n**Motivo:** ${snap.val().nome}\n**Prova:**`, msg.attachments.first())
                      
                      var embed = {
                        title: "<:ban:695386153636855848> ⋅ Usuário punido.",
                        description: `<:info:708048208932110487> **Usuário:** ${membro.user.tag}/${membro.id}\n<:motivo:698324538227818556> **Motivo:** ${snap.val().nome}\n⏰ **Tempo:** ${snap.val().um}`,
                        color: 'YELLOW',
                        image: {
                          url: 'https://cdn.discordapp.com/attachments/737866142143741963/779115169427095552/advancement.png'
                        }
                      }
                      
                      puni.send({ embed: embed })

                      setTimeout(() => {

                        database.ref(`Mute/${membro.id}`).remove()
                        membro.roles.remove('691694828597149696')

                      }, ms(snap.val().um))
                      

                    } else {

                      const quantiaSearch = await database.ref(`Usuários/Punições/${membro.id}`).once('value')
                      var somando = 0

                      quantiaSearch.forEach(x => {

                        somando = Number(somando) + Number(x.val().quantidade)

                      })

                      console.log(somando)

                      var search = await database.ref(`Usuários/Punições/${membro.id}/${msg2.content}`).once('value')
                      
                      switch(somando) {

                        case 1:

                          database.ref(`Usuários/Punições/${membro.id}/${msg2.content}`).update({
                            quantidade: Number(2)
                          })

                          membro.roles.add('691694828597149696')
                          database.ref(`Mute/${membro.id}`).set({
                            mute: 'Sim.'
                          })
    
                          provas.send(`**ID do usuário punido:** ${membro.user.tag}/${membro.id}\n**ID do staff que puniu:** ${message.author.tag}/${message.author.id}\n\n**Motivo:** ${snap.val().nome}\n**Prova:**`, msg.attachments.first())                   

                          var embed = {
                            title: "<:ban:695386153636855848> ⋅ Usuário punido.",
                            description: `<:info:708048208932110487> **Usuário:** ${membro.user.tag}/${membro.id}\n<:motivo:698324538227818556> **Motivo:** ${snap.val().nome}\n⏰ **Tempo:** ${snap.val().dois}`,
                            color: 'YELLOW',
                            image: {
                              url: 'https://cdn.discordapp.com/attachments/737866142143741963/779115169427095552/advancement.png'
                            }
                          }
                          
                          puni.send({ embed: embed })
    
                          setTimeout(() => {
    
                            database.ref(`Mute/${membro.id}`).remove()
                            membro.roles.remove('691694828597149696')
    
                          }, ms(snap.val().dois))

                        break;
                        case 2:

                          database.ref(`Usuários/Punições/${membro.id}/${msg2.content}`).update({
                            quantidade: Number(search.val().quantidade + 1)
                          })

                          provas.send(`**ID do usuário punido:** ${membro.user.tag}/${membro.id}\n**ID do staff que puniu:** ${message.author.tag}/${message.author.id}\n\n**Motivo:** ${snap.val().nome}\n**Prova:**`, msg.attachments.first())                   

                          var embed = {
                            title: "<:ban:695386153636855848> ⋅ Usuário punido.",
                            description: `<:info:708048208932110487> **Usuário:** ${membro.user.tag}/${membro.id}\n<:motivo:698324538227818556> **Motivo:** ${snap.val().nome}\n⏰ **Tempo:** ${snap.val().tres} dias`,
                            color: 'YELLOW',
                            image: {
                              url: 'https://cdn.discordapp.com/attachments/737866142143741963/779115169427095552/advancement.png'
                            }
                          }
                          
                          puni.send({ embed: embed })

                          var data = ((snap.val().tres * 86400000) + (new Date()).getTime())
                          var dataA = new Date()

                          dataA.setTime(data)

                          database.ref(`Usuários/Banimentos/${membro.id}`).set({
                              expira: moment(dataA).format("DD/MM/YYYY HH:mm"),
                          })

                          await message.guild.members.ban(membro.id, "TempBan")

                        break;
                        default:

                          database.ref(`Usuários/Punições/${membro.id}/${msg2.content}`).update({
                            quantidade: Number(search.val().quantidade + 1)
                          })

                          provas.send(`**ID do usuário punido:** ${membro.user.tag}/${membro.id}\n**ID do staff que puniu:** ${message.author.tag}/${message.author.id}\n\n**Motivo:** ${snap.val().nome}\n**Prova:**`, msg.attachments.first())                   

                          var embed = {
                            title: "<:ban:695386153636855848> ⋅ Usuário punido.",
                            description: `<:info:708048208932110487> **Usuário:** ${membro.user.tag}/${membro.id}\n<:motivo:698324538227818556> **Motivo:** limite de advertências\n⏰ **Tempo:** permanente`,
                            color: 'YELLOW',
                            image: {
                              url: 'https://cdn.discordapp.com/attachments/737866142143741963/779115169427095552/advancement.png'
                            }
                          }
                          
                          puni.send({ embed: embed })

                          await message.guild.members.ban(membro.id, "Limite de advertências")

                        break;

                      }

                    }

                  }

                })

                var embed = {
                  title: '<a:positivo:693579908324261918> ⋅ Usuário punido com sucesso.',
                  color: 'GREEN'
                }

                message.reply({ embed: embed })

              })

            })

        })

    }
}
