
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, message, chalk, args, Discord) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        // console.log(user)
        if(user.bot) return;
        if (reaction.partial) {
            try {
                await reaction.fetch();
            } catch (error) {
                console.error('Something went wrong when fetching the message:', error);
                return;
            }
        }

        if(reaction.message.channelId === configmain.reactchannelid) {
            if(reaction.message.id === configmain.nsfwreactmessageid) { return; };
            let icon2 = user.avatarURL('./Database/images/discord_logo_gray.png');
            const reactEmbed = new MessageEmbed()
                .setAuthor(`${user.tag}`, `${icon2}`)
                .setColor('BLUE')
                .setDescription(`**<@${user.id}> reacted to [Message](https://discord.com/channels/${configmain.mainguild}/${reaction.message.channelId}/${reaction.message.id}) in <#${reaction.message.channelId}> !**`)
                .setFooter(`UserID: ${user.id}`)
                .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [reactEmbed]});
        }
    });
};