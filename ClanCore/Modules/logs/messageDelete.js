
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, message, chalk, args, Discord) => {
    const { DateTime } = require('luxon');
    const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
    const SQLite = require("better-sqlite3");
    const sql_auditlog = new SQLite('./Database/sqlite/moderation/auditlog.sqlite');
    client.on("ready", async () => {
        // Check if the table "points" exists.
        const tableName = sql_auditlog.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'msgdel';").get();
        if (!tableName['count(*)']) {
            // If the table isn't there, create it and setup the database correctly.
            sql_auditlog.prepare("CREATE TABLE msgdel (AuditLogID TEXT PRIMARY KEY, Count TEXT, Date TEXT);").run();
            // Ensure that the "id" row is always unique and indexed.
            sql_auditlog.prepare("CREATE UNIQUE INDEX idx_msgdel_id ON msgdel (AuditLogID);").run();
            sql_auditlog.pragma("synchronous = 1");
            sql_auditlog.pragma("journal_mode = wal");
        }
    
        // And then we have two prepared statements to get and set the score data.
        client.getAuditLogID = sql_auditlog.prepare("SELECT * FROM msgdel WHERE AuditLogID = ?");
        client.getMsgDel = sql_auditlog.prepare("SELECT * FROM msgdel WHERE AuditLogID = ?");
        client.setAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO msgdel (AuditLogID, Count, Date) VALUES (@AuditLogID, @Count, @Date);");
        client.delAuditLogID = sql_auditlog.prepare("DELETE FROM msgdel WHERE AuditLogID = ?");
    });
    client.on('messageDelete', async message => {
        if(message.author === null) {
            var embed = new MessageEmbed()
                .setAuthor(` `)
                .setColor('ORANGE')
                .setDescription(`**Uncached Message send in <#${message.channelId}> was deleted**`)
                .setFooter(`UserID: Uncached`)
                .setTimestamp(new Date());
            return client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
        }
        const fetchedLogs = await message.guild.fetchAuditLogs({
            limit: 1,
            type: 'MESSAGE_DELETE',
        });
        
        const msgDelLog = fetchedLogs.entries.first();

        let timeThen = DateTime.utc().toFormat(timeFormat);
        let dataAuditLogID;
        // console.log(fetchedLogs);
        dataAuditLogID = client.getAuditLogID.get(message.id);
        if(!dataAuditLogID) {
            dataAuditLogID = { AuditLogID: `0`, Count: `0`, Date: `${timeThen}` };
        }

        // if(!dataAuditLogID) {
        //     dataAuditLogID = { AuditLogID: `${msgDelLog.id}`, Count: `${msgDelLog.extra.count}`, Date: `${timeThen}` };
        // }
        client.setAuditLogID.run(dataAuditLogID);
        if(msgDelLog.id === dataAuditLogID.AuditLogID) {
            console.log(msgDelLog.id, dataAuditLogID.AuditLogID);
            return;
        } else {
            // if(!dataAuditLogID) {
            //     dataAuditLogID = { AuditLogID: `${msgDelLog.id}`, Count: `${msgDelLog.extra.count}`, Date: `${timeThen}` };
            // }
            client.setAuditLogID.run(dataAuditLogID);
            // const insertAuditLogID = sql_auditlog.prepare("INSERT OR REPLACE INTO msgdel (AuditLogID, Count, Date) VALUES (@AuditLogID, @Count, @Date);");
            let dataAuditLogID2;
            dataAuditLogID2 = client.getAuditLogID.get(msgDelLog.id);
            if(!dataAuditLogID2) {
                dataAuditLogID2 = { AuditLogID: `${msgDelLog.id}`, Count: `0`, Date: `${timeThen}` };
            }
            // insertAuditLogID.run(dataAuditLogID2);

            if(msgDelLog.action === 'MESSAGE_DELETE') {
                const { executor, target } = msgDelLog;

                if(msgDelLog.extra.count > dataAuditLogID2.Count) {
                    // console.log(msgDelLog.extra.count, dataAuditLogID2.Count);
                    if(message.author === null) {
                        var embed = new MessageEmbed()
                            .setAuthor(` `)
                            .setColor('ORANGE')
                            .setDescription(`**Uncached Message send in <#${message.channelId}> was deleted**`)
                            .setFooter(`UserID: Uncached`)
                            .setTimestamp(new Date());
                        return client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
                    } if (target.id === message.author.id) {
                        let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
                        var embed = new MessageEmbed()
                            .setAuthor(`${executor.tag}`, `${icon2}`)
                            .setColor('ORANGE')
                            .setDescription(`**Message send by <@${message.author.id}> was deleted in <#${message.channelId}>**`)
                            .setFooter(`UserID: ${target.id}`)
                            .setTimestamp(new Date());
                            return client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
                    } if(message.author.id) {
                        let avatars = client.guilds.resolve(configmain.mainguild).members.resolve(message.author.id);
                        let icon2 = avatars.user.avatarURL('./Database/images/discord_logo_gray.png');
                        var embed = new MessageEmbed()
                            .setAuthor(`${message.author.username}#${message.author.discriminator}`, `${icon2}`)
                            .setColor('ORANGE')
                            .setDescription(`**Message send by <@${message.author.id}> was deleted in <#${message.channelId}>**`)
                            .setFooter(`UserID: ${message.author.id}`)
                            .setTimestamp(new Date());
                            return client.channels.cache.get(configmain.logchannelid).send({embeds: [embed]});
                    }
                    // console.log(executor.id, target.id, message.author.id)
                } else if(client) {
                    console.log('13');
                    // console.log('100');
                    // console.log(msgDelLog.extra.count, dataAuditLogID2.Count);
                };
                const insertAuditLogID = sql_auditlog.prepare("INSERT OR REPLACE INTO msgdel (AuditLogID, Count, Date) VALUES (@AuditLogID, @Count, @Date);");
                let dataAuditLogID3;
                if(!dataAuditLogID3) {
                    dataAuditLogID3 = { AuditLogID: `${msgDelLog.id}`, Count: `${msgDelLog.extra.count}`, Date: `${timeThen}` };
                }
                insertAuditLogID.run(dataAuditLogID3);
            };
        };
    });
};
