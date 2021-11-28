
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, message, chalk, args, Discord) => {
    client.on('guildMemberRemove', async member => {
        const fetchedLogs = await member.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_KICK',
        });

        const kickLog = fetchedLogs.entries.first();

        const { executor, target } = kickLog;

        if (target.id === member.id) {
            let avatars = client.guilds.resolve(configmain.mainguild).members.resolve(target.author.id);
            var embed = new MessageEmbed()
            .setAuthor(executor.tag, avatars.user.avatarURL({dynamic: true, size: 512}))
            .setTimestamp(new Date())
            .setColor('RED')
            .setTitle(`\`${target}\` kicked by \`${executor}\``)
            .setThumbnail(avatars)
            .setFooter(`UserID: ${target.id}`)
            .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
        }
    });
};