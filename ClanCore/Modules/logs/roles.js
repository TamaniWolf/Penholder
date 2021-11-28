
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
    client.on('roleUpdate', async  (role) => {
      const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: 'ROLE_UPDATE',
      });
    
      const roleLog = fetchedLogs.entries.first();

      let timeThen = DateTime.utc().toFormat(timeFormat);
      let dataAuditLogID;
      dataAuditLogID = client.getAuditLogID.get(roleLog.id);
      if(!dataAuditLogID) {
          dataAuditLogID = { AuditLogID: `0`, Date: `${timeThen}` };
      }
      if(roleLog.id === dataAuditLogID.AuditLogID) {
        return;
      } else {
        if(!dataAuditLogID) {
          dataAuditLogID = { AuditLogID: `${roleLog.id}`, Date: `${timeThen}` };
        }
        client.setAuditLogID.run(dataAuditLogID);
        const insertAuditLogID = sql_auditlog.prepare("INSERT OR IGNORE INTO auditlog (AuditLogID, Date) VALUES (@AuditLogID, @Date);");
        let dataAuditLogID2;
        if(!dataAuditLogID2) {
            dataAuditLogID2 = { AuditLogID: `${roleLog.id}`, Date: `${timeThen}` };
        }
        insertAuditLogID.run(dataAuditLogID2);

        if(roleLog.action === 'ROLE_UPDATE') {
          const { executor, changes, target } = roleLog;
          
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

          if(arrayOfStrings[1] === 'permissions' || arrayOfStrings[1] === 'name' || arrayOfStrings[1] === 'hoist' || arrayOfStrings[1] === 'color' || arrayOfStrings[1] === 'mentionable') {
            let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
            const roleChanges = new MessageEmbed()
              .setAuthor(`${executor.username}#${executor.discriminator}`, `${icon2}`)
              .setColor('YELLOW')
              .setDescription(`**<@${executor.id}> changed stuff in Role <@&${target.id}>**`)
              .setFooter(`UserID: ${executor.id}`)
              .setTimestamp(new Date());
            client.channels.cache.get(configmain.logchannelid).send({embeds: [roleChanges]});
          } else {
            if(stringKey === 'permissions') {
              let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
              const rolePerms = new MessageEmbed()
                .setAuthor(`${executor.username}#${executor.discriminator}`, `${icon2}`)
                .setColor('YELLOW')
                .setDescription(`**<@${executor.id}> changed the permissions of Role <@&${target.id}>**`)
                .setFooter(`UserID: ${executor.id}`)
                .setTimestamp(new Date());
              client.channels.cache.get(configmain.logchannelid).send({embeds: [rolePerms]});
            } 
            if(stringKey === 'name') {
              let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
              const roleName = new MessageEmbed()
                .setAuthor(`${executor.username}#${executor.discriminator}`, `${icon2}`)
                .setColor('YELLOW')
                .setDescription(`**<@${executor.id}> changed the name of Role \`${stringOld}\` to \`${stringNew}\`**`)
                .setFooter(`UserID: ${executor.id}`)
                .setTimestamp(new Date());
              client.channels.cache.get(configmain.logchannelid).send({embeds: [roleName]});
            } 
            if(stringKey === 'color') {
              let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
              const roleColor = new MessageEmbed()
                .setAuthor(`${executor.username}#${executor.discriminator}`, `${icon2}`)
                .setColor('YELLOW')
                .setDescription(`**<@${executor.id}> changed the color of Role <@&${target.id}> from \`${stringOld}\` to \`${stringNew}\`**`)
                .setFooter(`UserID: ${executor.id}`)
                .setTimestamp(new Date());
              client.channels.cache.get(configmain.logchannelid).send({embeds: [roleColor]});
            } 
            if(stringKey === 'hoist') {
              let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
              const roleHoist = new MessageEmbed()
                .setAuthor(`${executor.username}#${executor.discriminator}`, `${icon2}`)
                .setColor('YELLOW')
                .setDescription(`**<@${executor.id}> changed the Hoist of Role <@&${target.id}> from \`${stringOld}\` to \`${stringNew}\`**`)
                .setFooter(`UserID: ${executor.id}`)
                .setTimestamp(new Date());
              client.channels.cache.get(configmain.logchannelid).send({embeds: [roleHoist]});
            } 
            if(stringKey === 'mentionable') {
              let icon2 = executor.avatarURL('./Database/images/discord_logo_gray.png');
              const roleMention = new MessageEmbed()
                .setAuthor(`${executor.username}#${executor.discriminator}`, `${icon2}`)
                .setColor('YELLOW')
                .setDescription(`**<@${executor.id}> changed the Mentionability of Role <@&${target.id}> from \`${stringOld}\` to \`${stringNew}\`**`)
                .setFooter(`UserID: ${executor.id}`)
                .setTimestamp(new Date());
              client.channels.cache.get(configmain.logchannelid).send({embeds: [roleMention]});
            };
          }
        };
      };
    });
  };
};