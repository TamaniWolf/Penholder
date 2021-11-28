
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'language',
    aliases: ['lang'],
    description: 'editing lang',
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
            for (const row_ChannelAdmin of client.getCommandAdmin.all()) {
                if(row_ChannelAdmin.Editconfig === 'true') {
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
                                    // And then we have two prepared statements to get and set the score data.
                                    if(client) {
                                        if(!args[0]) {
                                            message.channel.send(lang.admin.lang.noargs1 + `\`${prefix}lang list\`` + lang.admin.lang.noargs2);
                                        }
                                        if(args[0] === 'help' || args[0] === 'list') {
                                            message.channel.send(lang.admin.lang.list);
                                        }
                                        //lang Config
                                        const sql_Onoff2 = new SQLite('./Database/sqlite/config/onoff.sqlite');
                                        if(client) {
                                            client.setLangConfig = sql_Onoff2.prepare("REPLACE INTO lang (LangID, LangSet) VALUES (@LangID, @LangSet);");
                                        };
                                        if(args[0] === 'default') {
                                            let dataLangConfigDefault;
                                            if(!dataLangConfigDefault) {
                                                dataLangConfigDefault = { LangID: row_lang.LangID, LangSet: './Database/lang/en_US.json' };
                                            }
                                            client.setLangConfig.run(dataLangConfigDefault);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.default)));
                                            message.reply(lang.admin.lang.default)
                                        }
                                        if(args[0] === 'english') {
                                            let dataLangConfigEnglish;
                                            if(!dataLangConfigEnglish) {
                                                dataLangConfigEnglish = { LangID: row_lang.LangID, LangSet: './Database/lang/en_US.json' };
                                            }
                                            client.setLangConfig.run(dataLangConfigEnglish);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.en)));
                                            message.reply(lang.admin.lang.en)
                                        }
                                        if(args[0] === 'german') {
                                            let dataLangConfigGerman;
                                            if(!dataLangConfigGerman) {
                                                dataLangConfigGerman = { LangID: row_lang.LangID ,LangSet: './Database/lang/de_DE.json' };
                                            }
                                            client.setLangConfig.run(dataLangConfigGerman);
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.de)));
                                            message.reply(lang.admin.lang.de)
                                        }
                                    };
                                } else {
                                    console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.errorperms)));
                                }
                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.lang.errorchannel)));
                            }
                        }
                    }
                }
            }
            break;}
    }
}