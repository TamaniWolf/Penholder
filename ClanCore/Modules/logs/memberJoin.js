
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, message, chalk, args, Discord) => {
    // const { DateTime } = require('luxon');
    // const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
    // const SQLite = require("better-sqlite3");
    // const sql_auditlog = new SQLite('./Database/sqlite/moderation/auditlog.sqlite');
    // client.on("ready", async () => {
    //     // Check if the table "points" exists.
    //     const tableName = sql_auditlog.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'msgdel';").get();
    //     if (!tableName['count(*)']) {
    //         // If the table isn't there, create it and setup the database correctly.
    //         sql_auditlog.prepare("CREATE TABLE msgdel (AuditLogID TEXT PRIMARY KEY, Count TEXT, Date TEXT);").run();
    //         // Ensure that the "id" row is always unique and indexed.
    //         sql_auditlog.prepare("CREATE UNIQUE INDEX idx_msgdel_id ON msgdel (AuditLogID);").run();
    //         sql_auditlog.pragma("synchronous = 1");
    //         sql_auditlog.pragma("journal_mode = wal");
    //     }
    
    //     // And then we have two prepared statements to get and set the score data.
    //     client.getAuditLogID = sql_auditlog.prepare("SELECT * FROM msgdel WHERE AuditLogID = ?");
    //     client.getMsgDel = sql_auditlog.prepare("SELECT * FROM msgdel WHERE AuditLogID = ?");
    //     client.setAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO msgdel (AuditLogID, Count, Date) VALUES (@AuditLogID, @Count, @Date);");
    //     client.delAuditLogID = sql_auditlog.prepare("DELETE FROM msgdel WHERE AuditLogID = ?");
    // });
    client.on('guildMemberAdd', async member => {
        // console.log(member);
        let icon2 = member.user.avatarURL('./Database/images/discord_logo_gray.png');
        const memberjoin = new MessageEmbed()
            .setAuthor(`${member.user.username}${member.user.discriminator}`, `${icon2}`)
            .setColor('BLUE')
            .setDescription(`**User <@${member.user.id}> joined the server**`)
            .setFooter(`UserID: ${member.user.id}`)
            .setTimestamp(new Date());
        client.channels.cache.get(configmain.logchannelid).send({embeds: [memberjoin]});
    });
};