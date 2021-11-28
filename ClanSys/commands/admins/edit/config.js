const { MessageEmbed } = require('discord.js');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'config',
    aliases: ['con'],
    description: 'editing config',
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
        const sql_ChannelRole = new SQLite('./Database/sqlite/config/channelRole.sqlite');
        client.getCommandAdmin = sql_Onoff.prepare("SELECT * FROM command_admin");
        client.getChannelAdmin = sql_ChannelRole.prepare("SELECT * FROM channel_admin");
        client.getRoleAdmin = sql_ChannelRole.prepare("SELECT * FROM role_admin");
        client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
        for (const row_lang of client.getLang.all()) {
        let lang = require('../../../.' + row_lang.LangSet);
        for (const row_CommandAdmin of client.getCommandAdmin.all()) {
            if(row_CommandAdmin.Editconfig === 'true') {
                //read config data
                let prefix = process.env.PREFIX;
                //code start
                for (const row_ChannelAdmin of client.getChannelAdmin.all()) {
                for (const row_RoleAdmin of client.getRoleAdmin.all()) {
                    const adminchannel1 = row_ChannelAdmin.Admin1;
                    const adminchannel2 = row_ChannelAdmin.Admin2;
                    const adminchannel3 = row_ChannelAdmin.Admin3;
                    const adminchannel4 = row_ChannelAdmin.Admin4;
                    const adminchannel5 = row_ChannelAdmin.Admin5;
                    const adminchannel6 = row_ChannelAdmin.Admin6;
                    const adminchannel7 = row_ChannelAdmin.Admin7;
                    const adminchannel8 = row_ChannelAdmin.Admin8;
                    const adminchannel9 = row_ChannelAdmin.Admin9;
                    const adminchannel10 = row_ChannelAdmin.Admin10;
                    const admin1 = row_RoleAdmin.Admin1;
                    const admin2 = row_RoleAdmin.Admin2;
                    const admin3 = row_RoleAdmin.Admin3;
                    const admin4 = row_RoleAdmin.Admin4;
                    const admin5 = row_RoleAdmin.Admin5;
                    const admin6 = row_RoleAdmin.Admin6;
                    const admin7 = row_RoleAdmin.Admin7;
                    const admin8 = row_RoleAdmin.Admin8;
                    const admin9 = row_RoleAdmin.Admin9;
                    const admin10 = row_RoleAdmin.Admin10;
                    if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3 || message.channel.id === adminchannel4 || message.channel.id === adminchannel5 || message.channel.id === adminchannel6 || message.channel.id === adminchannel7 || message.channel.id === adminchannel8 || message.channel.id === adminchannel9 || message.channel.id === adminchannel10) {
                        if(message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5) || message.member.roles.cache.has(admin6) || message.member.roles.cache.has(admin7) || message.member.roles.cache.has(admin8) || message.member.roles.cache.has(admin9) || message.member.roles.cache.has(admin10)) {
                            client.getCommandMember = sql_Onoff.prepare("SELECT * FROM command_member");
                            client.getDatabase = sql_Onoff.prepare("SELECT * FROM databse");
                            client.getMisc = sql_Onoff.prepare("SELECT * FROM misc");
                            client.getReaction = sql_Onoff.prepare("SELECT * FROM reaction");
                            client.getTwitch = sql_Onoff.prepare("SELECT * FROM twitch");
                            for (const row_CommandMember of client.getCommandMember) {
                            for (const row_Database of client.getDatabase) {
                            for (const row_Lang of client.getLang) {
                            for (const row_Misc of client.getMisc) {
                            for (const row_Reaction of client.getReaction) {
                            for (const row_Twitch of client.getTwitch) {
                                if(client){
                                    if(client) {
                                        client.setCommandAdmin = sql_Onoff.prepare("REPLACE INTO command_admin (OnOffID, Reload, Restart, Shutdown, Adminhelp, Changelog, Ping, Editconfig, Info, Db) VALUES (@OnOffID, @Reload, @Restart, @Shutdown, @Adminhelp, @Changelog, @Ping, @Editconfig, @Info, @Db);");
                                        client.setCommandMember = sql_Onoff.prepare("REPLACE INTO command_member (OnOffID, Fun_Blush, Fun_German, Fun_Grouphug, Fun_Growl, Fun_Hug, Fun_Hydrate, Fun_Slap, Help, McServer) VALUES (@OnOffID, @Fun_Blush, @Fun_German, @Fun_Grouphug, @Fun_Growl, @Fun_Hug, @Fun_Hydrate, @Fun_Slap, @Help, @McServer);");
                                        client.setDatabase = sql_Onoff.prepare("REPLACE INTO database (OnOffID, True, Autosetup, Newuser, Newuserrole, Level, Cooldown) VALUES (@OnOffID, @True, @Autosetup, @Newuser, @Newuserrole, @Level, @Cooldown);");
                                        client.setConfigOnoffMisc = sql_Onoff.prepare("REPLACE INTO misc (OnOffID, Mc_Ping) VALUES (@OnOffID, @Mc_Ping);");
                                        client.setReaction = sql_Onoff.prepare("REPLACE INTO reaction (OnOffID, Reaction_True, Words_True, Eliza_True, Words_Meep, Words_Haha, Words_Easteregg, Words_Gay, Words_Slap) VALUES (@OnOffID, @Reaction_True, @Words_True, @Eliza_True, @Words_Meep, @Words_Haha, @Words_Easteregg, @Words_Gay, @Words_Slap);");
                                        client.setTwitch = sql_Onoff.prepare("REPLACE INTO twitch (OnOffID, True, Setup, Request, Boxart) VALUES (@OnOffID, @True, @Setup, @Request, @Boxart);");
                                    };
                                    const configembed = new MessageEmbed()
                                    .setColor('DARK_GREEN')
                                    .setTitle('Configs - Main | OnOff | Lang')
                                    if(!args[0]) {
                                        configembed.setDescription('**' + lang.admin.config.noargs1 + `\`${prefix}config list\`` + lang.admin.config.noargs2 + '**')
                                        message.channel.send({embeds: [configembed]});
                                    }
                                    if(args[0] === 'help' || args[0] === 'command' || args[0] === 'commands' || args[0] === 'list') {
                                        configembed.setDescription(lang.admin.config.list)
                                        message.channel.send({embeds: [configembed]});
                                    }
                                    //
                                    //Command Admin
                                    if(args[0] === 'reload') {
                                        if(args[1] === "on") {
                                            let dataConfigReloadOn;
                                            if(!dataConfigReloadOn) {
                                                dataConfigReloadOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: 'true', Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigReloadOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reload" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigReloadOff;
                                            if(!dataConfigReloadOff) {
                                                dataConfigReloadOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: 'false', Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigReloadOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reload" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'restart') {
                                        if(args[1] === "on") {
                                            let dataConfigRestartOn;
                                            if(!dataConfigRestartOn) {
                                                dataConfigRestartOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: 'true', Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigRestartOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("restart" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigRestartOff;
                                            if(!dataConfigRestartOff) {
                                                dataConfigRestartOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: 'false', Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigRestartOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("restart" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'shutdown') {
                                        if(args[1] === "on") {
                                            let dataConfigShutdownOn;
                                            if(!dataConfigShutdownOn) {
                                                dataConfigShutdownOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: 'true', Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigShutdownOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("shutdown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigShutdownOff;
                                            if(!dataConfigShutdownOff) {
                                                dataConfigShutdownOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: 'false', Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigShutdownOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("shutdown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'adminhelp') {
                                        if(args[1] === "on") {
                                            let dataConfigAdminhelpOn;
                                            if(!dataConfigAdminhelpOn) {
                                                dataConfigAdminhelpOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: 'true', Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigAdminhelpOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("adminhelp" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigAdminhelpOff;
                                            if(!dataConfigAdminhelpOff) {
                                                dataConfigAdminhelpOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: 'false', Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigAdminhelpOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("adminhelp" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'changelog') {
                                        if(args[1] === "on") {
                                            let dataConfigChangelogOn;
                                            if(!dataConfigChangelogOn) {
                                                dataConfigChangelogOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: 'true', Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigChangelogOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("changelog" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigChangelogOff;
                                            if(!dataConfigChangelogOff) {
                                                dataConfigChangelogOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: 'false', Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigChangelogOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("changelog" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'ping') {
                                        if(args[1] === "on") {
                                            let dataConfigPingOn;
                                            if(!dataConfigPingOn) {
                                                dataConfigPingOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: 'true', Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigPingOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("ping" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigPingOff;
                                            if(!dataConfigPingOff) {
                                                dataConfigPingOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: 'false', Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigPingOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("ping" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'config') {
                                        if(args[1] === "on") {
                                            let dataConfigConfigEditOn;
                                            if(!dataConfigConfigEditOn) {
                                                dataConfigConfigEditOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: 'true', Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigConfigEditOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("config" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigConfigEditOff;
                                            if(!dataConfigConfigEditOff) {
                                                dataConfigConfigEditOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: 'false', Info: row_ChannelAdmin.Info, Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigConfigEditOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("config" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'info') {
                                        if(args[1] === "on") {
                                            let dataConfigInfoOn;
                                            if(!dataConfigInfoOn) {
                                                dataConfigInfoOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: 'true', Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigInfoOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("botinfo" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigInfoOff;
                                            if(!dataConfigInfoOff) {
                                                dataConfigInfoOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: 'false', Db: row_ChannelAdmin.Db }
                                            };
                                            client.setCommandAdmin.run(dataConfigInfoOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("botinfo" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'db') {
                                        if(args[1] === 'on') {
                                            let dataConfigDatabaseOn;
                                            if(!dataConfigDatabaseOn) {
                                                dataConfigDatabaseOn = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: 'true' }
                                            }
                                            client.setCommandAdmin.run(dataConfigDatabaseOn);
                                        }
                                        if(args[1] === 'off') {
                                            let dataConfigDatabaseOff;
                                            if(!dataConfigDatabaseOff) {
                                                dataConfigDatabaseOff = { OnOffID: row_ChannelAdmin.OnOffID, Reload: row_ChannelAdmin.Reload, Restart: row_ChannelAdmin.Restart, Shutdown: row_ChannelAdmin.Shutdown, Adminhelp: row_ChannelAdmin.Adminhelp, Changelog: row_ChannelAdmin.Changelog, Ping: row_ChannelAdmin.Ping, Editconfig: row_ChannelAdmin.Editconfig, Info: row_ChannelAdmin.Info, Db: 'false' }
                                            }
                                            client.setCommandAdmin.run(dataConfigDatabaseOff);
                                        }
                                    }
                                    //
                                    //Command Member
                                    if(args[0] === 'blush') {
                                        if(args[1] === "on") {
                                            let dataConfigFunBlushOn;
                                            if(!dataConfigFunBlushOn) {
                                                dataConfigFunBlushOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: 'true', Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunBlushOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("blush" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunBlushOff;
                                            if(!dataConfigFunBlushOff) {
                                                dataConfigFunBlushOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: 'false', Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunBlushOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("blush" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'german') {
                                        if(args[1] === "on") {
                                            let dataConfigFunGermanOn;
                                            if(!dataConfigFunGermanOn) {
                                                dataConfigFunGermanOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: 'true', Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunGermanOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("german" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunGermanOff;
                                            if(!dataConfigFunGermanOff) {
                                                dataConfigFunGermanOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: 'false', Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunGermanOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("german" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'grouphug') {
                                        if(args[1] === "on") {
                                            let dataConfigFunGrouphugOn;
                                            if(!dataConfigFunGrouphugOn) {
                                                dataConfigFunGrouphugOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: 'true', Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunGrouphugOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("grouphug" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunGrouphugOff;
                                            if(!dataConfigFunGrouphugOff) {
                                                dataConfigFunGrouphugOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: 'false', Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunGrouphugOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("grouphug" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'growl') {
                                        if(args[1] === "on") {
                                            let dataConfigFunGrowlOn;
                                            if(!dataConfigFunGrowlOn) {
                                                dataConfigFunGrowlOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: 'true', Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunGrowlOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("growl" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunGrowlOff;
                                            if(!dataConfigFunGrowlOff) {
                                                dataConfigFunGrowlOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: 'false', Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunGrowlOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("growl" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'hug') {
                                        if(args[1] === "on") {
                                            let dataConfigFunHugOn;
                                            if(!dataConfigFunHugOn) {
                                                dataConfigFunHugOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: 'true', Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunHugOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("hug" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunHugOff;
                                            if(!dataConfigFunHugOff) {
                                                dataConfigFunHugOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: 'false', Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunHugOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("hug" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'hydrate') {
                                        if(args[1] === "on") {
                                            let dataConfigFunHydrateOn;
                                            if(!dataConfigFunHydrateOn) {
                                                dataConfigFunHydrateOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: 'true', Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunHydrateOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("hydrate" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunHydrateOff;
                                            if(!dataConfigFunHydrateOff) {
                                                dataConfigFunHydrateOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: 'false', Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunHydrateOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("hydrate" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'slap') {
                                        if(args[1] === "on") {
                                            let dataConfigFunSlapOn;
                                            if(!dataConfigFunSlapOn) {
                                                dataConfigFunSlapOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: 'true', Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunSlapOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("slap" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigFunSlapOff;
                                            if(!dataConfigFunSlapOff) {
                                                dataConfigFunSlapOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: 'false', Help: row_CommandMember.Help, McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigFunSlapOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("slap" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'help') {
                                        if(args[1] === "on") {
                                            let dataConfigHelpOn;
                                            if(!dataConfigHelpOn) {
                                                dataConfigHelpOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: 'true', McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigHelpOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("help" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigHelpOff;
                                            if(!dataConfigHelpOff) {
                                                dataConfigHelpOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: 'false', McServer: row_CommandMember.McServer }
                                            }
                                            client.setCommandMember.run(dataConfigHelpOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("help" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'mcserver') {
                                        if(args[1] === "on") {
                                            let dataConfigMcserverOn;
                                            if(!dataConfigMcserverOn) {
                                                dataConfigMcserverOn = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: 'true' }
                                            }
                                            client.setCommandMember.run(dataConfigMcserverOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("mcserver" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataConfigMcserverOff;
                                            if(!dataConfigMcserverOff) {
                                                dataConfigMcserverOff = { OnOffID: row_CommandMember.OnOffID, Fun_Blush: row_CommandMember.Fun_Blush, Fun_German: row_CommandMember.Fun_German, Fun_Grouphug: row_CommandMember.Fun_Grouphug, Fun_Growl: row_CommandMember.Fun_Growl, Fun_Hug: row_CommandMember.Fun_Hug, Fun_Hydrate: row_CommandMember.Fun_Hydrate, Fun_Slap: row_CommandMember.Fun_Slap, Help: row_CommandMember.Help, McServer: 'false' }
                                            }
                                            client.setCommandMember.run(dataConfigMcserverOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("mcserver" + lang.admin.config.setoff)));
                                        }
                                    }
                                    //
                                    //Database
                                    if(args[0] === 'database') {
                                        if(args[1] === "on") {
                                            let dataDatabaseOn;
                                            if(!dataDatabaseOn) {
                                                dataDatabaseOn = { OnOffID: row_Database.OnOffID, True: 'true', Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDatabaseOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataDatabaseOff;
                                            if(!dataDatabaseOff) {
                                                dataDatabaseOff = { OnOffID: row_Database.OnOffID, True: 'false', Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDatabaseOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'autosetup') {
                                        if(args[1] === "on") {
                                            let dataDBAutosetupOn;
                                            if(!dataDBAutosetupOn) {
                                                dataDBAutosetupOn = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: 'true', Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBAutosetupOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataDBAutosetupOff;
                                            if(!dataDBAutosetupOff) {
                                                dataDBAutosetupOff = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: 'false', Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBAutosetupOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'newuser') {
                                        if(args[1] === "on") {
                                            let dataDBNewuserOn;
                                            if(!dataDBNewuserOn) {
                                                dataDBNewuserOn = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: 'true', Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBNewuserOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataDBNewuserOff;
                                            if(!dataDBNewuserOff) {
                                                dataDBNewuserOff = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: 'false', Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBNewuserOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'newuserrole') {
                                        if(args[1] === "on") {
                                            let dataDBNewuserroleOn;
                                            if(!dataDBNewuserroleOn) {
                                                dataDBNewuserroleOn = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: 'true', Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBNewuserroleOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataDBNewuserroleOff;
                                            if(!dataDBNewuserroleOff) {
                                                dataDBNewuserroleOff = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: 'false', Level: row_Database.Level, Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBNewuserroleOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'level') {
                                        if(args[1] === "on") {
                                            let dataDBLevelOn;
                                            if(!dataDBLevelOn) {
                                                dataDBLevelOn = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: 'true', Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBLevelOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataDBlevelOff;
                                            if(!dataDBlevelOff) {
                                                dataDBlevelOff = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: 'false', Cooldown: row_Database.Cooldown }
                                            }
                                            client.setDatabase.run(dataDBlevelOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'cooldown') {
                                        if(args[1] === "on") {
                                            let dataDBCooldownOn;
                                            if(!dataDBCooldownOn) {
                                                dataDBCooldownOn = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: 'true' }
                                            }
                                            client.setDatabase.run(dataDBCooldownOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataDBCooldownOff;
                                            if(!dataDBCooldownOff) {
                                                dataDBCooldownOff = { OnOffID: row_Database.OnOffID, True: row_Database.True, Autosetup: row_Database.Autosetup, Newuser: row_Database.Newuser, Newuserrole: row_Database.Newuserrole, Level: row_Database.Level, Cooldown: 'false' }
                                            }
                                            client.setDatabase.run(dataDBCooldownOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    //
                                    //Lang
                                    // if(args[0] === 'lang') {
                                    //     if(args[1] === "on") {
                                    //         let dataLangOn;
                                    //         if(!dataLangOn) {
                                    //             dataLangOn = { LangID: row_configOnoffLang.LangID, LangSet: row_configOnoffLang.LangSet }
                                    //         }
                                    //         client.setTwitch.run(dataLangOn);
                                    //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.seton)));
                                    //     }
                                    //     if(args[1] === "off") {
                                    //         let dataLangOff;
                                    //         if(!dataLangOff) {
                                    //             dataLangOff = { LangID: row_configOnoffLang.LangID, LangSet: row_configOnoffLang.LangSet }
                                    //         }
                                    //         client.setTwitch.run(dataLangOff);
                                    //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.setoff)));
                                    //     }
                                    // }
                                    //
                                    //Misc
                                    if(args[0] === 'mcping') {
                                        if(args[1] === "on") {
                                            let dataMCPingOn;
                                            if(!dataMCPingOn) {
                                                dataMCPingOn = { OnOffID: row_Misc.OnOffID, Mc_Ping: 'true' }
                                            }
                                            client.setDatabase.run(dataMCPingOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataMCPingOff;
                                            if(!dataMCPingOff) {
                                                dataMCPingOff = { OnOffID: row_Database.OnOffID, Mc_Ping: 'false' }
                                            }
                                            client.setDatabase.run(dataMCPingOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("cooldown" + lang.admin.config.setoff)));
                                        }
                                    }
                                    //
                                    //Reaction
                                    if(args[0] === 'reaction') {
                                        if(args[1] === "on") {
                                            let dataReactionOn;
                                            if(!dataReactionOn) {
                                                dataReactionOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: 'true', Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataReactionOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataReactionOff;
                                            if(!dataReactionOff) {
                                                dataReactionOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: 'false', Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataReactionOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'words') {
                                        if(args[1] === "on") {
                                            let dataReactionWordsOn;
                                            if(!dataReactionWordsOn) {
                                                dataReactionWordsOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: 'true', Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataReactionWordsOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataReactionWordsOff;
                                            if(!dataReactionWordsOff) {
                                                dataReactionWordsOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: 'false', Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataReactionWordsOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'eliza') {
                                        if(args[1] === "on") {
                                            let dataReactionElizaOn;
                                            if(!dataReactionElizaOn) {
                                                dataReactionElizaOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: 'true', Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataReactionElizaOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataReactionElizaOff;
                                            if(!dataReactionElizaOff) {
                                                dataReactionElizaOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: 'false', Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataReactionElizaOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'words_meep') {
                                        if(args[1] === "on") {
                                            let dataWordsMeepOn;
                                            if(!dataWordsMeepOn) {
                                                dataWordsMeepOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: 'true', Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsMeepOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataWordsMeepOff;
                                            if(!dataWordsMeepOff) {
                                                dataWordsMeepOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: 'false', Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsMeepOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'words_haha') {
                                        if(args[1] === "on") {
                                            let dataWordsHahaOn;
                                            if(!dataWordsHahaOn) {
                                                dataWordsHahaOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: 'true', Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsHahaOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataWordsHahaOff;
                                            if(!dataWordsHahaOff) {
                                                dataWordsHahaOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: 'false', Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsHahaOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'words_easteregg') {
                                        if(args[1] === "on") {
                                            let dataWordsEastereggOn;
                                            if(!dataWordsEastereggOn) {
                                                dataWordsEastereggOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: 'true', Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsEastereggOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataWordsEastereggOff;
                                            if(!dataWordsEastereggOff) {
                                                dataWordsEastereggOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: 'false', Words_Gay: row_Reaction.Words_Gay, Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsEastereggOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'words_gay') {
                                        if(args[1] === "on") {
                                            let dataWordsGayOn;
                                            if(!dataWordsGayOn) {
                                                dataWordsGayOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: 'true', Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsGayOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataWordsGayOff;
                                            if(!dataWordsGayOff) {
                                                dataWordsGayOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: 'false', Words_Slap: row_Reaction.Words_Slap }
                                            }
                                            client.setReaction.run(dataWordsGayOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'words_slap') {
                                        if(args[1] === "on") {
                                            let dataWordsSlapOn;
                                            if(!dataWordsSlapOn) {
                                                dataWordsSlapOn = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: 'true' }
                                            }
                                            client.setReaction.run(dataWordsSlapOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataWordsSlapOff;
                                            if(!dataWordsSlapOff) {
                                                dataWordsSlapOff = { OnOffID: row_Reaction.OnOffID, Reaction_True: row_Reaction.Reaction_True, Words_True: row_Reaction.Words_True, Eliza_True: row_Reaction.Eliza_True, Words_Meep: row_Reaction.Words_Meep, Words_Haha: row_Reaction.Words_Haha, Words_Easteregg: row_Reaction.Words_Easteregg, Words_Gay: row_Reaction.Words_Gay, Words_Slap: 'false' }
                                            }
                                            client.setReaction.run(dataWordsSlapOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reaction" + lang.admin.config.setoff)));
                                        }
                                    }
                                    //
                                    //Twitch
                                    if(args[0] === 'twitch') {
                                        if(args[1] === "on") {
                                            let dataTwitchOn;
                                            if(!dataTwitchOn) {
                                                dataTwitchOn = { OnOffID: row_Twitch.OnOffID, True: 'true', Setup: row_Twitch.Setup, Request: row_Twitch.Request, Boxart: row_Twitch.Boxart }
                                            }
                                            client.setTwitch.run(dataTwitchOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataTwitchOff;
                                            if(!dataTwitchOff) {
                                                dataTwitchOff = { OnOffID: row_Twitch.OnOffID, True: 'false', Setup: row_Twitch.Setup, Request: row_Twitch.Request, Boxart: row_Twitch.Boxart }
                                            }
                                            client.setTwitch.run(dataTwitchOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'setup') {
                                        if(args[1] === "on") {
                                            let dataTwitchSetupOn;
                                            if(!dataTwitchSetupOn) {
                                                dataTwitchSetupOn = { OnOffID: row_Twitch.OnOffID, True: row_Twitch.True, Setup: 'true', Request: row_Twitch.Request, Boxart: row_Twitch.Boxart }
                                            }
                                            client.setTwitch.run(dataTwitchSetupOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataTwitchSetupOff;
                                            if(!dataTwitchSetupOff) {
                                                dataTwitchSetupOff = { OnOffID: row_Twitch.OnOffID, True: row_Twitch.True, Setup: 'false', Request: row_Twitch.Request, Boxart: row_Twitch.Boxart }
                                            }
                                            client.setTwitch.run(dataTwitchSetupOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'request') {
                                        if(args[1] === "on") {
                                            let dataTwitchReqestOn;
                                            if(!dataTwitchReqestOn) {
                                                dataTwitchReqestOn = { OnOffID: row_Twitch.OnOffID, True: row_Twitch.True, Setup: row_Twitch.Setup, Request: 'true', Boxart: row_Twitch.Boxart }
                                            }
                                            client.setTwitch.run(dataTwitchReqestOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataTwitchReqestOff;
                                            if(!dataTwitchReqestOff) {
                                                dataTwitchReqestOff = { OnOffID: row_Twitch.OnOffID, True: row_Twitch.True, Setup: row_Twitch.Setup, Request: 'false', Boxart: row_Twitch.Boxart }
                                            }
                                            client.setTwitch.run(dataTwitchReqestOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch" + lang.admin.config.setoff)));
                                        }
                                    }
                                    if(args[0] === 'twitch_boxart') {
                                        if(args[1] === "on") {
                                            let dataTwitchBoxartOn;
                                            if(!dataTwitchBoxartOn) {
                                                dataTwitchBoxartOn = { OnOffID: row_ChannelAdmin.OnOffID, True: row_Twitch.True, Setup: row_Twitch.Setup, Request: row_Twitch.Request, Boxart: 'true' }
                                            };
                                            client.setTwitch.run(dataTwitchBoxartOn);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch_boxart" + lang.admin.config.seton)));
                                        }
                                        if(args[1] === "off") {
                                            let dataTwitchBoxartOff;
                                            if(!dataTwitchBoxartOff) {
                                                dataTwitchBoxartOff = { OnOffID: row_ChannelAdmin.OnOffID, True: row_Twitch.True, Setup: row_Twitch.Setup, Request: row_Twitch.Request, Boxart: 'false' }
                                            }
                                            client.setTwitch.run(dataTwitchBoxartOff);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("twitch_boxart" + lang.admin.config.setoff)));
                                        }
                                    }
                                    let commented = '1'
                                    if(commented === '7') {
                                        // //
                                        // //Admin
                                        // if(args[0] === 'clear') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffadmin3 = onoffread.command.admin;
                                        //         onoffadmin3.clear = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("clear" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffadmin3 = onoffread.command.admin;
                                        //         onoffadmin3.clear = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("clear" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'mute') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffadmin3 = onoffread.command.admin;
                                        //         onoffadmin3.mute = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("mute" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffadmin3 = onoffread.command.admin;
                                        //         onoffadmin3.mute = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("mute" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'react') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffadmin3 = onoffread.command.admin;
                                        //         onoffadmin3.react = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("react" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffadmin3 = onoffread.command.admin;
                                        //         onoffadmin3.react = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("react" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // //
                                        // //
                                        // //Member
                                        // if(args[0] === 'balance') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.balance = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("balance" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.balance = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("balance" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'gamble') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.gamble = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("gamble" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.gamble = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("gamble" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'jobs') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.jobs = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("jobs" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.jobs = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("jobs" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'test') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.test = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("test" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.test = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("test" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'work') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.work = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("work" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let onoffuser1 = onoffread.command.user.eco;
                                        //         onoffuser1.work = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("work" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // //
                                        // //
                                        // //Wordreaction
                                        // if(args[0] === 'reactionrole') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.reactionrole = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reactionrole" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.reactionrole = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("reactionrole" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'clannsfw') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.clannsfw = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("clannsfw" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.clannsfw = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("clannsfw" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'clansfw') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.clansfw = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("clansfw" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.clansfw = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("clansfw" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // if(args[0] === 'wordreact') {
                                        //     if(args[1] === "on") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.wordreact = true;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("wordreact" + lang.admin.config.seton)));
                                        //     }
                                        //     if(args[1] === "off") {
                                        //         let onoffrawdata = fs.readFileSync('./ClanSys/config/onoff.json');
                                        //         let onoffread = JSON.parse(onoffrawdata);
                                        //         let wordreaction = onoffread.command.wordreaction
                                        //         wordreaction.wordreact = false;
                                        //         let dataconfig = JSON.stringify(onoffread, null, 2);
                                        //         fs.writeFileSync('./ClanSys/config/onoff.json', dataconfig);
                                        //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white("wordreact" + lang.admin.config.setoff)));
                                        //     }
                                        // }
                                        // // console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.config.log)));
                                    }
                                }
                            }}}}}}
                        } else {
                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.config.errorperms)));
                        }
                    } else {
                        console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.config.errorchannel)));
                    }
                }}
            }
        }
        break;}
    }
}