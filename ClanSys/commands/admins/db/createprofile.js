
const { DateTime } = require('luxon');
require('dotenv').config();

module.exports = {
    name: 'createprofile',
    aliases: ['cp'],
    description: 'Create Profile for all users',
    guildOnly: true,
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql = new SQLite('./Database/sqlite/profile.sqlite');
        const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
        client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
        for (const row_lang of client.getLang.all()) {
            let lang = require('../../../.' + row_lang.LangSet);
            try {
                // Member
                if(args[0] === 'all') {
                    if(client) {
                        // Check if the table "user_id" exists.
                        const tablecooldown = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'cooldown';").get();
                        if (!tablecooldown['count(*)']) {
                            // If the table isn't there, create it and setup the database correctly.
                            sql.prepare("CREATE TABLE cooldown (ProfileID TEXT PRIMARY KEY, NewJoin TEXT, Gamble TEXT, Job TEXT);").run();
                            // Ensure that the "id" row is always unique and indexed.
                            sql.prepare("CREATE UNIQUE INDEX idx_cooldown_id ON cooldown (ProfileID);").run();
                            sql.pragma("synchronous = 1");
                            sql.pragma("journal_mode = wal");
                        }
                        
                        const tablegamble = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'gamble';").get();
                        if (!tablegamble['count(*)']) {
                            // If the table isn't there, create it and setup the database correctly.
                            sql.prepare("CREATE TABLE gamble (ProfileID TEXT PRIMARY KEY, GambleToken TEXT, GambleCooldown TEXT);").run();
                            // Ensure that the "id" row is always unique and indexed.
                            sql.prepare("CREATE UNIQUE INDEX idx_gamble_id ON gamble (ProfileID);").run();
                            sql.pragma("synchronous = 1");
                            sql.pragma("journal_mode = wal");
                        }
                        
                        const tablejob = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'job';").get();
                        if (!tablejob['count(*)']) {
                            // If the table isn't there, create it and setup the database correctly.
                            sql.prepare("CREATE TABLE job (ProfileID TEXT PRIMARY KEY, HasJob TEXT, Jobs TEXT, JobExp TEXT, Worked TEXT);").run();
                            // Ensure that the "id" row is always unique and indexed.
                            sql.prepare("CREATE UNIQUE INDEX idx_job_id ON job (ProfileID);").run();
                            sql.pragma("synchronous = 1");
                            sql.pragma("journal_mode = wal");
                        }
                        
                        const tablemember = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'member';").get();
                        if (!tablemember['count(*)']) {
                            // If the table isn't there, create it and setup the database correctly.
                            sql.prepare("CREATE TABLE member (ProfileID TEXT PRIMARY KEY, GuildID TEXT, JoinTimestamp TEXT, PremiumTimestamp TEXT, Deleted TEXT, Nickname TEXT, UserID TEXT, DisplayName TEXT);").run();
                            // Ensure that the "id" row is always unique and indexed.
                            sql.prepare("CREATE UNIQUE INDEX idx_member_id ON member (ProfileID);").run();
                            sql.pragma("synchronous = 1");
                            sql.pragma("journal_mode = wal");
                        }
                        
                        // And then we have two prepared statements to get and set the score data.
                        client.getCooldown = sql.prepare("SELECT * FROM member WHERE UserID = ? AND GuildID = ?");
                        client.setCooldown = sql.prepare("INSERT OR REPLACE INTO cooldown (ProfileID) VALUES (@ProfileID);");
                        
                        client.getGamble = sql.prepare("SELECT * FROM member WHERE UserID = ? AND GuildID = ?");
                        client.setGamble = sql.prepare("INSERT OR REPLACE INTO gamble (ProfileID) VALUES (@ProfileID);");
                        
                        client.getJob = sql.prepare("SELECT * FROM member WHERE UserID = ? AND GuildID = ?");
                        client.setJob = sql.prepare("INSERT OR REPLACE INTO job (ProfileID) VALUES (@ProfileID);");
                
                        client.getMember = sql.prepare("SELECT * FROM member WHERE UserID = ? AND GuildID = ?");
                        client.setMember = sql.prepare("INSERT OR REPLACE INTO member (ProfileID, UserID, GuildID, JoinTimestamp, PremiumTimestamp, Deleted, Nickname, DisplayName) VALUES (@ProfileID, @UserID, @GuildID, @JoinTimestamp, @PremiumTimestamp, @Deleted, @Nickname, @DisplayName);");
                    };

                    if(client) {
                        let guildIdGet = message.guildId
                        let guiltGet = client.guilds.cache.get(guildIdGet);
                        let membersGet = await guiltGet.members.fetch()
                        membersGet.forEach(memberSet => {
                            // console.log(memberSet.user.id);
                            if (memberSet.user.bot === true) return;

                            let datacooldown;
                            let datagamble;
                            let datajob;
                            let datamember;
                            
                            datacooldown = client.getCooldown.get(memberSet.user.id, memberSet.guild.id);
                            datagamble = client.getGamble.get(memberSet.user.id, memberSet.guild.id);
                            datajob = client.getJob.get(memberSet.user.id, memberSet.guild.id);
                            datamember = client.getMember.get(memberSet.user.id, memberSet.guild.id);

                            if (!datacooldown) {
                                datacooldown = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}` };
                            }
                            client.setCooldown.run(datacooldown);
                            const insertCooldown = sql.prepare("INSERT OR REPLACE INTO cooldown (ProfileID, NewJoin, Gamble, Job) VALUES (@ProfileID, @NewJoin, @Gamble, @Job);");
                            let datacooldown2;
                            if (!datacooldown2) {
                                // let newjointime = DateTime.utc(memberSet.joinedTimestamp).plus({days: 4}).toFormat(timeFormat)
                                let newjointime = DateTime.utc().plus({days: 4}).toISO(memberSet.joinedTimestamp);
                                // console.log(newjointime);
                                // let newjointime = DateTime.toISO(newjointimes)
                                datacooldown2 = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}`, NewJoin: `${newjointime}`, Gamble: '2121-01-31T23:59:59.989Z', Job: '2121-01-31T23:59:59.989Z' }
                            }
                            insertCooldown.run(datacooldown2)

                            if (!datagamble) {
                                datagamble = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}` }
                            }
                            client.setGamble.run(datagamble);
                            const insertGamble = sql.prepare("INSERT OR REPLACE INTO gamble (ProfileID, GambleToken, GambleCooldown) VALUES (@ProfileID, @GambleToken, @GambleCooldown);");
                            let datagamble2;
                            if (!datagamble2) {
                                datagamble2 = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}`, GambleToken: '5', GambleCooldown: 'false' }
                            }
                            insertGamble.run(datagamble2)

                            if (!datajob) {
                                datajob = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}` }
                            }
                            client.setJob.run(datajob);
                            const insertJob = sql.prepare("INSERT OR REPLACE INTO job (ProfileID, HasJob, Jobs, JobExp, Worked) VALUES (@ProfileID, @HasJob, @Jobs, @JobExp, @Worked);");
                            let datajob2;
                            if (!datajob2) {
                                datajob2 = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}`, HasJob: 'false', Jobs: 'none', JobExp: '0', Worked: '5' }
                            }
                            insertJob.run(datajob2)

                            if (!datamember) {
                                datamember = { ProfileID: `${memberSet.guild.id}-${memberSet.user.id}`, UserID: memberSet.user.id, GuildID: memberSet.guild.id, JoinTimestamp: memberSet.joinedTimestamp, PremiumTimestamp: memberSet.premiumSinceTimestamp, Deleted: memberSet.Deleted, Nickname: memberSet.nickname, DisplayName: memberSet.displayName }
                            }
                            client.setMember.run(datamember);
                        })
                    };
                } else if(!args[0]) {
                    return;
                }
            }catch(e){
                console.log(e);
            }
            let amountClear = '1'
            await message.channel.bulkDelete(amountClear, true)
            console.log('DBs created.');
        }
    }
};
