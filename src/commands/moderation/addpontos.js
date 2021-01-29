const Discord = require('discord.js')

module.exports = {
    name: 'addpontos',
    aliases: ['addpontos'],
    run: async (client, message, args, database) => {

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Você não possui permissão para executar esse tipo de comando.")

        const membro = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]))

        const produto = args[1];
        const quantidade = args[2];

        var erro = new Discord.MessageEmbed()
            .setTitle("<:erro:708058875986706495> | Você não inseriu um membro.")
            .setDescription("Você precisa adicionar o membro que deseja adicionar os pontos como parametro.\n\nUse **c!addpontos (Membro) (Produto) (Quantidade)**")
            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
            .setColor("RED")

        if (!membro) return message.reply(erro)

        var erro = new Discord.MessageEmbed()
            .setTitle("<:erro:708058875986706495> | Você não inseriu o produto.")
            .setDescription(`Você precisa adicionar o produto que o usuário doou como parametro.\n\nUse **c!addpontos ${membro.user.username} (Produto) (Quantidade)**`)
            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
            .setColor("RED")

        if (!produto) return message.reply(erro)

        var erro = new Discord.MessageEmbed()
            .setTitle("<:erro:708058875986706495> | Você não inseriu a quantidade.")
            .setDescription(`Você precisa inserir a quantidade de produtos que o usuário doou como parametro.\n\nUse **c!addpontos ${membro.user.username} ${produto} (Quantidade)**`)
            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
            .setColor("RED")

        if (!quantidade) return message.reply(erro)

        const argumento = produto.toLowerCase()
        const format = argumento.toLowerCase()

        database.ref(`Colaborador/${membro.id}`).once('value').then(async function (snap) {


            if (snap.val() === null) {

                switch (format) {

                    case 'crunchyroll': {

                        var soma = Number(quantidade) * 10

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: Number(quantidade),
                            p2: 0,
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'spotify': {

                        var soma = Number(quantidade) * 15

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: Number(quantidade),
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'semi': {

                        var soma = Number(quantidade) * 15

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: Number(quantidade),
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'full': {

                        var soma = Number(quantidade) * 70

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: 0,
                            p4: Number(quantidade),
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'capa': {

                        var soma = Number(quantidade) * 50

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: 0,
                            p4: 0,
                            p5: Number(quantidade),
                            p6: 0,
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'classic': {

                        var soma = Number(quantidade) * 70

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: Number(quantidade),
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'gaming': {

                        var soma = Number(quantidade) * 150

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: quantidade,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'eterno': {

                        var soma = Number(quantidade) * 30

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: Number(quantidade),
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'vpn': {

                        var soma = Number(quantidade) * 10

                        database.ref(`Colaborador/${membro.id}`).set({
                            p1: 0,
                            p2: 0,
                            p3: 0,
                            p4: 0,
                            p5: 0,
                            p6: 0,
                            p7: 0,
                            p8: Number(quantidade),
                            pontos: soma
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;

                    }
                    default: {

                        var erro = new Discord.MessageEmbed()
                            .setTitle("<:erro:708058875986706495> | Você não inseriu o produto.")
                            .setDescription(`Você precisa adicionar o produto que o usuário doou como parametro.\n\nUse **c!addpontos ${membro.user.username} (Produto) (Quantidade)**\n\n**__Observações:__**\nProduto minecraft semi full se representa como **semi**\nProduto minecraft full acesso se representa como **full**\nProduto spotify permanente se representa como **eterno**\nProduto nitro classic se representa como **classic**\nProduto nitro gaming se representa como **gaming**`)
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')

                        message.reply(erro)

                        break;
                    }

                }

            } else {

                switch (format) {

                    case 'crunchyroll': {

                        var soma = quantidade * 10
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p1)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p1: adc,
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'spotify': {

                        var soma = Number(quantidade) * 15
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p2)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p2: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'semi': {

                        var soma = Number(quantidade) * 15
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p3)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p3: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'full': {

                        var soma = Number(quantidade) * 70
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p4)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p4: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'capa': {

                        var soma = Number(quantidade) * 50
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p5)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p5: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'classic': {

                        var soma = Number(quantidade) * 70
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p6)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p6: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'gaming': {

                        var soma = Number(quantidade) * 150
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p7)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p7: quantidade + snap.val().p7,
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'eterno': {

                        var soma = quantidade * 30
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p2)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p2: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    case 'vpn': {

                        var soma = quantidade * 10
                        var somando = Number(snap.val().pontos) + Number(soma);
                        var adc = Number(quantidade) + Number(snap.val().p8)

                        database.ref(`Colaborador/${membro.id}`).update({
                            p8: Number(adc),
                            pontos: somando
                        })

                        var sucesso = new Discord.MessageEmbed()
                            .setTitle("<:certo:708454422182625370> | Pontuação adicionada com sucesso.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setColor("GREEN")

                        message.reply(sucesso)

                        break;
                    }
                    default: {

                        var erro = new Discord.MessageEmbed()
                            .setTitle("<:erro:708058875986706495> | Você não inseriu o produto.")
                            .setFooter('🌞| Cubic Sun © Todos os direitos reservados.', 'https://images-ext-1.discordapp.net/external/xOhhrhMMBi20tC_VXB2TI0fOPOQ7OSfxUqOGrp9b71w/%3Fsize%3D2048/https/cdn.discordapp.com/icons/688195861318074406/a_0766fc30814bd0cce63ea55eddcd012a.gif')
                            .setDescription(`Você precisa adicionar o produto que o usuário doou como parametro.\n\nUse **c!addpontos ${membro.user.username} (Produto) (Quantidade)**\n\n**__Observações:__**\nProduto minecraft semi full se representa como **semi**\nProduto minecraft full acesso se representa como **full**\nProduto spotify permanente se representa como **eterno**\nProduto nitro classic se representa como **classic**\nProduto nitro gaming se representa como **gaming**`)

                        message.reply(erro)

                        break;
                    }
                }

            }


        })


    }
}