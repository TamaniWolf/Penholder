
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, chalk, args, Discord) => {
    client.on('messageUpdate', (oldMessage, newMessage) => {
        if(oldMessage.content) {
            if(!newMessage.content) {
                return;
            }
            if(oldMessage.content === newMessage.content) {
                return;
            }
            let avatars = client.guilds.resolve(configmain.mainguild).members.resolve(newMessage.author.id);
            var embed = new MessageEmbed()
                .setAuthor(`${oldMessage.author.username}#${oldMessage.author.discriminator}`, avatars.user.avatarURL({dynamic: true, size: 512}))
                .setColor('BLUE')
                .setDescription(`**Message edited in <#${newMessage.channelId}> ** [Jump to Message](https://discord.com/channels/${configmain.mainguild}/${newMessage.channelId}/${newMessage.id})`)
                .addFields(
                    {name: 'Before',value: `${oldMessage}`},
                    {name: 'After', value: `${newMessage}`})
                .setFooter(`UserID: ${newMessage.author.id}`)
                .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
        } else
        if(!oldMessage.content) {
            if(!newMessage.content) {
                return;
            }
            let avatars = client.guilds.resolve(configmain.mainguild).members.resolve(newMessage.author.id);
            var embed = new MessageEmbed()
                .setAuthor(`${newMessage.author.username}#${newMessage.author.discriminator}`, avatars.user.avatarURL({dynamic: true, size: 512}))
                .setColor('BLUE')
                .setDescription(`**Message edited in <#${newMessage.channelId}>** [Jump to Message](https://discord.com/channels/${configmain.mainguild}/${newMessage.channelId}/${newMessage.id})`)
                .addFields(
                    {name: 'Before:',value: `*Uncached*`},
                    {name: 'After:', value: `${newMessage}`})
                .setFooter(`UserID: ${newMessage.author.id}`)
                .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
        };
    });
};