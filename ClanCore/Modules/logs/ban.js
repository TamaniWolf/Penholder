
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, message, chalk, args, Discord) => {
    client.on('guildBanAdd', async ban => {
        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_ADD',
        });

        const banLog = fetchedLogs.entries.first();

        const { executor, target } = banLog;

        if (target.id === ban.user.id) {
            let avatars = client.guilds.resolve(configmain.mainguild).members.resolve(target.author.id);
            var embed = new MessageEmbed()
            .setAuthor(executor.tag, avatars.user.avatarURL({dynamic: true, size: 512}))
            .setTimestamp(new Date())
            .setColor('RED')
            .setTitle(`\`${target}\` banned by \`${executor}\``)
            .setThumbnail(avatars)
            .setFooter(`UserID: ${target.id}`)
            .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
        };
    });
    client.on('guildBanRemove', async ban => {
        const fetchedLogs = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 'MEMBER_BAN_REMOVE',
        });

        const banLog = fetchedLogs.entries.first();

        const { executor, target } = banLog;

        if (target.id === ban.user.id) {
            let avatars = client.guilds.resolve(configmain.mainguild).members.resolve(target.author.id);
            var embed = new MessageEmbed()
            .setAuthor(executor.tag, avatars.user.avatarURL({dynamic: true, size: 512}))
            .setTimestamp(new Date())
            .setColor('DARK_GREEN')
            .setTitle(`\`${target}\` unbanned by \`${executor}\``)
            .setThumbnail(avatars)
            .setFooter(`UserID: ${target.id}`)
            .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
        };
    });
};