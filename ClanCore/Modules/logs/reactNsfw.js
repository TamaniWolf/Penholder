
const { MessageEmbed } = require('discord.js');
const configmain = require('../../../ClanSys/config/config.json');
require('dotenv').config();
module.exports = (client, message, chalk, args, Discord) => {
    client.on('messageReactionAdd', async (reaction, user) => {
        console.log(reaction.emoji.name)

        if(reaction.message.id === configmain.nsfwreactmessageid) {
            console.log('2')
            if(reaction.emoji.name === 'Aheago'){
                console.log('3')
                let icon2 = user.avatarURL('./Database/images/discord_logo_gray.png');
                const reactEmbed = new MessageEmbed()
                .setAuthor(`${user.tag}`, `${icon2}`)
                .setColor('LIGHT_GREY')
                .setDescription(`**<@${user.id}> reacted to the NSFW role.**`)
                .setFooter(`UserID: ${user.id}`)
                .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [reactEmbed]});
            console.log('4')
            }
        }
    });
};