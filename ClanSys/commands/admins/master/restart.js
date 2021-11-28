
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'restart',
    aliases: ['newstart'],
    //permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES", "CONNECT"],
    description: "Restarts the bot",
    guildOnly: true,
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
                    //code start
                    for (const row_ChannelAdmin of client.getChannelAdmin.all()) {
                        for (const row_configOnoffRole of client.getRoleAdmin.all()) {
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
                            const admin1 = row_configOnoffRole.Admin1;
                            const admin2 = row_configOnoffRole.Admin2;
                            const admin3 = row_configOnoffRole.Admin3;
                            const admin4 = row_configOnoffRole.Admin4;
                            const admin5 = row_configOnoffRole.Admin5;
                            const admin6 = row_configOnoffRole.Admin6;
                            const admin7 = row_configOnoffRole.Admin7;
                            const admin8 = row_configOnoffRole.Admin8;
                            const admin9 = row_configOnoffRole.Admin9;
                            const admin10 = row_configOnoffRole.Admin10;
                            if(message.channel.id === adminchannel1 || message.channel.id === adminchannel2 || message.channel.id === adminchannel3 || message.channel.id === adminchannel4 || message.channel.id === adminchannel5 || message.channel.id === adminchannel6 || message.channel.id === adminchannel7 || message.channel.id === adminchannel8 || message.channel.id === adminchannel9 || message.channel.id === adminchannel10) {
                                if(message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5) || message.member.roles.cache.has(admin6) || message.member.roles.cache.has(admin7) || message.member.roles.cache.has(admin8) || message.member.roles.cache.has(admin9) || message.member.roles.cache.has(admin10)) {
                            //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.restart.log)));
                            //         message.channel.send(lang.admin.restart.text)
                            //         const { exec } = require("child_process");
                            //         exec("pm2 restart clanBot", (error, stdout, stderr) => {
                            //             if (error) {
                            //                 console.log(`error: ${error.message}`);
                            //                 return;
                            //             }
                            //             if (stderr) {
                            //                 console.log(`stderr: ${stderr}`);
                            //                 return;
                            //             }
                            //             console.log(`stdout: ${stdout}`);
                            //         });
                                } else {
                                    console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.restart.errorperms)));
                                }
                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.restart.errorchannel)));
                            }
                        }
                    }
                }
            }
        }
    }
}