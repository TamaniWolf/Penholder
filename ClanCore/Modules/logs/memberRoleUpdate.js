
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
        // console.log(client.getLang)
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
        client.on('guildMemberUpdate', async (member) => {
            // Member Role Update
            const roleFetchedLogs = await member.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_ROLE_UPDATE',
            });

            const memberRoleUpdateLog = roleFetchedLogs.entries.first();

            let timeThen = DateTime.utc().toFormat(timeFormat);
            let dataAuditLogID;
            dataAuditLogID = client.getAuditLogID.get(memberRoleUpdateLog.id);
            if(!dataAuditLogID) {
                dataAuditLogID = { AuditLogID: `0`, Date: `${timeThen}` };
            }

            if(memberRoleUpdateLog.id === dataAuditLogID.AuditLogID) {
                return;
            } else {
                if(!dataAuditLogID) {
                    dataAuditLogID = { AuditLogID: `${memberRoleUpdateLog.id}`, Date: `${timeThen}` };
                }
                client.setAuditLogID.run(dataAuditLogID);
                const insertAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO auditlog (AuditLogID, Date) VALUES (@AuditLogID, @Date);");
                let dataAuditLogID2;
                if(!dataAuditLogID2) {
                    dataAuditLogID2 = { AuditLogID: `${memberRoleUpdateLog.id}`, Date: `${timeThen}` };
                }
                insertAuditLogID.run(dataAuditLogID2);

                if(memberRoleUpdateLog.action === 'MEMBER_ROLE_UPDATE') {
                    const { executor, changes, target } = memberRoleUpdateLog;

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

                    var arrayChangeName = arrayOfStrings3.map(function([obj]) {
                        return obj.name;
                    });
                    var arrayChangeId = arrayOfStrings3.map(function([obj]) {
                        return obj.id;
                    });
                    let stringChangeName = arrayChangeName.toString();
                    let stringChangeId = arrayChangeId.toString();

                    if(stringKey === '$remove') {
                        let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
                        const roleRemove = new MessageEmbed()
                            .setAuthor(`${executor.tag}${executor.discriminator}`, `${icon2}`)
                            .setColor('ORANGE')
                            .setDescription(`**Role <@&${stringChangeId}> removed from <@${target.id}>**`)
                            .setFooter(`UserID: ${target.id}`)
                            .setTimestamp(new Date());
                        client.channels.cache.get(configmain.logchannelid).send({embeds: [roleRemove]});
                    } else if(stringKey === '$add') {
                        let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
                        const roleRemove = new MessageEmbed()
                            .setAuthor(`${executor.tag}${executor.discriminator}`, `${icon2}`)
                            .setColor('BLUE')
                            .setDescription(`**Role <@&${stringChangeId}> Added to <@${target.id}>**`)
                            .setFooter(`UserID: ${target.id}`)
                            .setTimestamp(new Date());
                        client.channels.cache.get(configmain.logchannelid).send({embeds: [roleRemove]});
                    };
                };
            };
        });
    };
};