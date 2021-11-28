
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'reload',
    aliases: ['loadnew'],
    description: "Reloads a commands",
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
                            //         const commandName = args[0]/*.toLowerCase()*/;
                            //         if(commandName === 'clan-nsfw' || commandName === 'clan-sfw' || commandName === 'eliza' || commandName === 'clannsfw' || commandName === 'clansfw'){
                            //         console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.nocommandfound)));
                            //         } else {
                            //             if(!args[0]) return message.channel.send(lang.admin.reload.nocommand);
                            //             if (!args.length) return message.channel.send(lang.admin.reload.nocommand2);
                            //             try{
                            //                 const commandName = args[0]/*.toLowerCase()*/;
                            //                 const command1 = message.client.commands.get(commandName) ||
                            //                 message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
                            //                 const getAllFiles = function(dirPath, arrayOfFiles) {
                            //                     files = fs.readdirSync(dirPath);
                            //                     arrayOfFiles = arrayOfFiles || []
                            //                     files.forEach(function(file) {
                            //                         if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                            //                             arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
                            //                         } else {
                            //                             // arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
                            //                             arrayOfFiles.push(path.join(dirPath, "/", file))
                            //                         }
                            //                     })
                            //                     return arrayOfFiles
                            //                 }
                            //                 const results = getAllFiles("./ClanSys/commands/")
                            //                 // console.log(results)
                            //                 let filterjs = results.filter(result => result.endsWith(`\\${commandName}.js`))
                            //                 // console.log(filterjs);
                            //                 if(filterjs === []) {
                            //                     console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.nocommandfound)));
                            //                 } else {
                            //                     const array = filterjs;
                            //                     console.log(array.replace('\\', '/'))
                            //                     // newarr;
                            //                     delete require.cache[require.resolve(`./${newarr}`)];
                            //                     const newCommand = require(`./${newarr}`);
                            //                     message.client.commands.set(commandName, newCommand);
                            //                     message.channel.send(lang.admin.reload.text1 + commandName + lang.admin.reload.text2);
                            //                     console.log(lang.admin.reload.text1 + commandName + lang.admin.reload.text2);
                            //                 }
                            //             } catch (error) {
                            //                 console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(error)));
                            //             }
                            //         }
                                } else {
                                    console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.errorperms)));
                                }
                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.reload.errorchannel)));
                            }
                        }
                    }
                }
            }
        }
    }
}