
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
        client.on('channelUpdate', async (channel) => {
            // Channel Update
            const channelFetchedLogs = await channel.guild.fetchAuditLogs({
                limit: 1,
                type: 'CHANNEL_UPDATE',
            });
    
            const channelUpdateLog = channelFetchedLogs.entries.first();

            let timeThen = DateTime.utc().toFormat(timeFormat);
            let dataAuditLogID;
            dataAuditLogID = client.getAuditLogID.get(channelUpdateLog.id);
            if(!dataAuditLogID) {
                dataAuditLogID = { AuditLogID: `0`, Date: `${timeThen}` };
            }

            if(channelUpdateLog.id === dataAuditLogID.AuditLogID) {
                return;
            } else {
                if(!dataAuditLogID) {
                    dataAuditLogID = { AuditLogID: `${channelUpdateLog.id}`, Date: `${timeThen}` };
                }
                client.setAuditLogID.run(dataAuditLogID);
                const insertAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO auditlog (AuditLogID, Date) VALUES (@AuditLogID, @Date);");
                let dataAuditLogID2;
                if(!dataAuditLogID2) {
                    dataAuditLogID2 = { AuditLogID: `${channelUpdateLog.id}`, Date: `${timeThen}` };
                }
                insertAuditLogID.run(dataAuditLogID2);

                if(channelUpdateLog.action === 'MEMBER_ROLE_UPDATE') {
                    const { executor, changes, target } = channelUpdateLog;

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
                    let stringOld = arrayOfStrings2.toString()
                    let stringNew = arrayOfStrings3.toString()

                    // console.log(changes);

                    if(stringKey === 'name') {
                        if(stringOld === '') {
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelName = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} changed \`${stringOld}\`'s name to \`${target}\`**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelName]});
                        }
                    } 
                    if(stringKey === 'nsfw') {
                        if(stringNew === 'true'){
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOn = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} turned NSFW \`ON\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOn]});
                        } else if(stringNew === 'false') {
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} turned NSFW \`OFF\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                    }
                    if(stringKey === 'default_auto_archive_duration') {
                        if(stringOld === '') {
                            if(stringNew === '60'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`1h\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            } else if(stringNew === '1440'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`24h\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            } else if(stringNew === '4320'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`3 days\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            } else if(stringNew === '10080'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`1 week\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            }
                        }
                        if(stringOld === '60' || stringOld === '1440' || stringOld === '4320' || stringOld === '10080') {
                            if(stringNew === '60'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`1h\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            } else if(stringNew === '1440'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`24h\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            } else if(stringNew === '4320'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`3 days\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            } else if(stringNew === '10080'){
                                let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                                const channelNsfwOff = new MessageEmbed()
                                    .setAuthor(`${executor.tag}`, `${icon2}`)
                                    .setColor('BLUE')
                                    .setDescription(`**${executor} set threads auto archive to \`1 week\` in <#${target.id}>**`)
                                    .setFooter(`UserID: ${executor.id}`)
                                    .setTimestamp(new Date());
                                client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                            }
                        }
                    }
                    if(stringKey === 'rate_limit_per_user') {
                        // 21600
                        if(stringNew === '0') {
                            // 0s OFF
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} turned slowmode \`OFF\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '5') {
                            // 5s
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`5 seconds\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '10') {
                            // 10s
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`10 seconds\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '15') {
                            // 15s
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`15 seconds\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '30') {
                            // 30s
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`30 seconds\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '60') {
                            // 1m
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`1 minute\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '120') {
                            // 2m
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`2 minutes\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '300') {
                            // 5m
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`5 minutes\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '600') {
                            // 10m
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`10 minutes\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '900') {
                            // 15m
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`15 minutes\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '1800') {
                            // 30m
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`30 minutes\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '3600') {
                            // 1h
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`1h\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '7200') {
                            // 2h
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`2h\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                        if(stringNew === '21600') {
                            // 6h
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set slowmode to \`6h\` in <#${target.id}>**`)
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                    }
                    if(stringKey === 'topic') {
                        if(stringOld === '') {
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set <#${target.id}>'s new topic**`)
                                .addFields(
                                    {name: 'Before',value: `*<Not cached>*`},
                                    {name: 'After', value: `${stringNew}`})
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        } else if(stringNew === '') {
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set <#${target.id}>'s new topic**`)
                                .addFields(
                                    {name: 'Before',value: `${stringOld}`},
                                    {name: 'After', value: `*<removed>*`})
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        } else {
                            let icon2 = channel.user.avatarURL('./Database/images/discord_logo_gray.png');
                            const channelNsfwOff = new MessageEmbed()
                                .setAuthor(`${executor.tag}`, `${icon2}`)
                                .setColor('BLUE')
                                .setDescription(`**${executor} set <#${target.id}>'s new topic**`)
                                .addFields(
                                    {name: 'Before',value: `${stringOld}`},
                                    {name: 'After', value: `${stringNew}`})
                                .setFooter(`UserID: ${executor.id}`)
                                .setTimestamp(new Date());
                            client.channels.cache.get(configmain.logchannelid).send({embeds: [channelNsfwOff]});
                        }
                    };
                };
            };
        });
    };
};