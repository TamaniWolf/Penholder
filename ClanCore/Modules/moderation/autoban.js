
require('dotenv').config();

module.exports = (client, chalk, message, args) => {
    const SQLite = require("better-sqlite3");
    const sql_autoban = new SQLite('./Database/sqlite/moderation/moderation.sqlite');
    const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
    client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
    for (const row_lang of client.getLang.all()) {
        let lang = require('../../.' + row_lang.LangSet);
        client.on("ready", () => {
            // Check if the table "points" exists.
            const tableName = sql_autoban.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'autobanname';").get();
            if (!tableName['count(*)']) {
                // If the table isn't there, create it and setup the database correctly.
                sql_autoban.prepare("CREATE TABLE autobanname (UserName TEXT PRIMARY KEY, GuildID TEXT);").run();
                // Ensure that the "id" row is always unique and indexed.
                sql_autoban.prepare("CREATE UNIQUE INDEX idx_autoban_username ON autobanname (UserName);").run();
                sql_autoban.pragma("synchronous = 1");
                sql_autoban.pragma("journal_mode = wal");
            }
            const tableID = sql_autoban.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'autobanid';").get();
            if (!tableID['count(*)']) {
                // If the table isn't there, create it and setup the database correctly.
                sql_autoban.prepare("CREATE TABLE autobanid (UserID TEXT PRIMARY KEY, UserName TEXT, GuildID TEXT);").run();
                // Ensure that the "id" row is always unique and indexed.
                sql_autoban.prepare("CREATE UNIQUE INDEX idx_autoban_userid ON autobanid (UserID);").run();
                sql_autoban.pragma("synchronous = 1");
                sql_autoban.pragma("journal_mode = wal");
            }
        
            // And then we have two prepared statements to get and set the score data.
            client.getAutobanName = sql_autoban.prepare("SELECT * FROM autobanname WHERE UserName = ?");
            client.getAutobanID = sql_autoban.prepare("SELECT * FROM autobanid WHERE UserID = ?");
            client.setAutobanName = sql_autoban.prepare("INSERT INTO autobanname (UserName, GuildID) VALUES (@UserName, @GuildID);");
            client.setAutobanID = sql_autoban.prepare("INSERT OR REPLACE INTO autobanid (UserID) VALUES (@UserID);");
            client.delAutobanName = sql_autoban.prepare("DELETE FROM autobanname WHERE UserName = ?");
            client.delAutobanID = sql_autoban.prepare("DELETE FROM autobanid WHERE UserID = ?");
        });
        client.on('guildBanAdd', async ban => {
            const fetchedLogs = await ban.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_ADD',
            });
            // Since there's only 1 audit log entry in this collection, grab the first one
            const banLog = fetchedLogs.entries.first();
        
            // Perform a coherence check to make sure that there's *something*
            if (!banLog) return console.log(`'${ban.user.tag}' was banned from '${ban.guild.name}' but no audit log could be found.`);
        
            // Now grab the user object of the person who banned the member
            // Also grab the target of this action to double-check things
            const { executor, target } = banLog;
        
            // Update the output with a bit more information
            // Also run a check to make sure that the log returned was for the same banned member
            if (target.id === ban.user.id) {
                console.log(`'${ban.user.tag}' got hit with the swift hammer of justice in the guild '${ban.guild.name}', wielded by the mighty '${executor.tag}'`);
            } else if (target.username === ban.user.username) {
                console.log(`'${ban.user.tag}' got hit with the swift hammer of justice in the guild '${ban.guild.name}', wielded by the mighty '${executor.tag}'`);
            } else {
                console.log(`'${ban.user.tag}' got hit with the swift hammer of justice in the guild '${ban.guild.name}', audit log fetch was inconclusive.`);
            }
            let dataAutobanID;
            dataAutobanID = client.getAutobanID.get(ban.user.id);
            if(!dataAutobanID) {
                dataAutobanID = { UserID: `${ban.user.id}` };
            }
            client.setAutobanID.run(dataAutobanID);
            const insertAutobanID = sql_autoban.prepare("INSERT OR REPLACE INTO autobanid (UserID, UserName, GuildID) VALUES (@UserID, @UserName, @GuildID);");
            let dataAutobanID2;
            if(!dataAutobanID2) {
                dataAutobanID2 = { UserID: `${ban.user.id}`, UserName: `${ban.user.username}`, GuildID: `${ban.guild.id}` };
            }
            insertAutobanID.run(dataAutobanID2);
            let dataAutobanName;
            dataAutobanName = client.getAutobanName.get(ban.user.username);
            if(!dataAutobanName) {
                dataAutobanName = { UserName: `${ban.user.username}`, GuildID: `${ban.guild.id}` };
            }
            client.setAutobanName.run(dataAutobanName);
        });
        client.on('guildBanRemove', async ban => {
            const fetchedLogs = await ban.guild.fetchAuditLogs({
                limit: 1,
                type: 'MEMBER_BAN_REMOVE',
            });
            // Since there's only 1 audit log entry in this collection, grab the first one
            const banLog = fetchedLogs.entries.first();
        
            // Perform a coherence check to make sure that there's *something*
            if (!banLog) return console.log(`'${ban.user.tag}' was unbanned from '${ban.guild.name}' but no audit log could be found.`);
        
            // Now grab the user object of the person who banned the member
            // Also grab the target of this action to double-check things
            const { executor, target } = banLog;
        
            // Update the output with a bit more information
            // Also run a check to make sure that the log returned was for the same banned member
            if (target.id === ban.user.id) {
                console.log(`'${ban.user.tag}' got unbannad with the swift hammer of justice in the guild '${ban.guild.name}', wielded by the mighty '${executor.tag}'`);
            } else if (target.username === ban.user.username) {
                console.log(`'${ban.user.tag}' got unbannad with the swift hammer of justice in the guild '${ban.guild.name}', wielded by the mighty '${executor.tag}'`);
            } else {
                console.log(`'${ban.user.tag}' got unbannad with the swift hammer of justice in the guild '${ban.guild.name}', audit log fetch was inconclusive.`);
            }
            client.delAutobanID.run(ban.user.id);
            client.delAutobanName.run(ban.user.username);
        });
        client.on('guildMemberAdd', member => {
            let dataAutobanMemberName;
            dataAutobanMemberName = client.getAutobanName.get(member.user.username);
            let dataAutobanMemberID;
            dataAutobanMemberID = client.getAutobanID.get(member.user.id);
            let Reasons = 'Name/ID on ban list';
            if(!dataAutobanMemberID) {
            } else {
                if(dataAutobanMemberID.UserID === member.user.id) {
                    member.ban({days: 7, reason: Reasons});
                } else if(dataAutobanMemberName.UserName === member.user.username) {
                    member.ban({days: 7, reason: Reasons});
                } else {
                    //
                };
            }
        });
    }
};