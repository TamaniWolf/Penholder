
const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const configmain = require('../../../ClanSys/config/config.json');
module.exports = (client, message, chalk, args, Discord) => {
    const { DateTime } = require('luxon');
    const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
    const SQLite = require("better-sqlite3");
    const sql_auditlog = new SQLite('./Database/sqlite/moderation/auditlog.sqlite');
    const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
    client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
    for (const row_lang of client.getLang.all()) {
        let lang = require('../../.' + row_lang.LangSet);
        client.on("ready", () => {
            // Check if the table "points" exists.
            const tableName = sql_auditlog.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'auditlog';").get();
            if (!tableName['count(*)']) {
                // If the table isn't there, create it and setup the database correctly.
                sql_auditlog.prepare("CREATE TABLE auditlog (AuditLogID TEXT PRIMARY KEY, Date TEXT);").run();
                // Ensure that the "id" row is always unique and indexed.
                sql_auditlog.prepare("CREATE UNIQUE INDEX idx_auditlog_id ON auditlog (AuditLogID);").run();
                sql_auditlog.pragma("synchronous = 1");
                sql_auditlog.pragma("journal_mode = wal");
            }
        
            // And then we have two prepared statements to get and set the score data.
            client.getAuditLogID = sql_auditlog.prepare("SELECT * FROM auditlog WHERE AuditLogID = ?");
            client.setAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO auditlog (AuditLogID, Date) VALUES (@AuditLogID, @Date);");
            client.delAuditLogID = sql_auditlog.prepare("DELETE FROM auditlog WHERE AuditLogID = ?");
        });
        client.on('channelDelete', async (channel) => {
            // Channel Update
            const channelFetchedLogs = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: 'CHANNEL_DELETE',
            });
    
            const channelDeleteLog = channelFetchedLogs.entries.first();

            let timeThen = DateTime.utc().toFormat(timeFormat);
            let dataAuditLogID;
            dataAuditLogID = client.getAuditLogID.get(channelDeleteLog.id);
            if(!dataAuditLogID) {
                dataAuditLogID = { AuditLogID: `0`, Date: `${timeThen}` };
            }

            if(channelDeleteLog.id === dataAuditLogID.AuditLogID) {
                return;
            } else {
                if(!dataAuditLogID) {
                    dataAuditLogID = { AuditLogID: `${channelDeleteLog.id}`, Date: `${timeThen}` };
                }
                client.setAuditLogID.run(dataAuditLogID);
                const insertAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO auditlog (AuditLogID, Date) VALUES (@AuditLogID, @Date);");
                let dataAuditLogID2;
                if(!dataAuditLogID2) {
                    dataAuditLogID2 = { AuditLogID: `${channelDeleteLog.id}`, Date: `${timeThen}` };
                }
                insertAuditLogID.run(dataAuditLogID2);

                if(channelDeleteLog.action === 'CHANNEL_DELETE') {
                    const { executor, changes, target } = channelDeleteLog;

                    var arrayOfStrings = changes.map(function(obj) {
                        return obj.key;
                    });

                    var arrayOfStrings2 = changes.map(function(obj) {
                        return obj.old;
                    });
                    var arrayOfStrings3 = changes.map(function(obj) {
                        return obj.new;
                    });
                    let stringKey = arrayOfStrings.toString()
                    let stringOld = arrayOfStrings2[1].toString()
                    let stringNew = arrayOfStrings3.toString()

                    // console.log(changes);

                    // if(arrayOfStrings[0] === 'name') {
                        if(stringOld === '0'){
                            let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelName = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('ORANGE')
                                .setDescription(`**${executor} deleted text channel \`${target.name}\`**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelName]});
                        }
                        if(stringOld === '2'){
                            let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelName = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('ORANGE')
                                .setDescription(`**${executor} deleted voice channel \`${target.name}\`**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelName]});
                        }
                        if(stringOld === '4'){
                            let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelName = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('ORANGE')
                                .setDescription(`**${executor} deleted Category \`${target.name}\`**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelName]});
                        };
                    // };
                };
            };
        });
    };
};