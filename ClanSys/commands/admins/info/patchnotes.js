const { MessageAttachment, MessageEmbed } = require('discord.js');
const fs = require('fs');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();
var hasIcon = 'yes';
const botVersion = require('../../../../package.json');

module.exports = {
    name: 'patchnotes',
    aliases: ['changelog', 'patch'],
    description: "Displays what has been changed in the Bot.",
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
                                    const changelog_files = fs.readdirSync('./Database/changelogs/').filter(file => file.endsWith('.json'));

                                    for(const file of changelog_files){
                                        const changelog = require(`../../../../Database/changelogs/${file}`);
                                        if(changelog.number){
                                            client.commands.set(changelog.number, changelog);
                                        } else {
                                            continue;
                                        }
                                    }
                                    const changelog = `${changelog_files}`
                                    var newStr = changelog.replace(/,/g, "\n");
                                    
                                    if(!args[0]) {
                                        message.channel.send(newStr)
                                    } else {
                                        let changeName = args[0].toLowerCase()

                                        delete require.cache[require.resolve(`../../../../Database/changelogs/${changeName}.json`)]
                                        client.commands.delete(changeName)
                                        const pull = require(`../../../../Database/changelogs/${changeName}.json`)
                                        client.commands.set(changeName, pull)
                                        console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.changelog.log)));

                                        let rawdata = fs.readFileSync(`./Database/changelogs/${args[0]}.json`);
                                        let changeRead = JSON.parse(rawdata);

                                        let changeEmbed = changeRead.embed
                                        let changeDate = changeRead.date
                                        
                                        try {
                                            if (args[0]) {
                                                const file = new MessageAttachment('./Database/images/bot1.png')
                                                const clanEmbedChangelog = new MessageEmbed()
                                                .setTitle(lang.admin.changelog.title)
                                                .setColor('GREEN')
                                                .setDescription(`**__${changeDate}__**\n \n   ${changeEmbed}`)
                                                .setThumbnail('attachment://bot1.png')
                                                message.channel.send({embeds: [clanEmbedChangelog], files: [file]});
                                            }
                                        } catch(e) {
                                            console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(e)));
                                        }
                                    }
                                } else {
                                    console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.changelog.errorperms)));
                                }
                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.changelog.errorchannel)));
                            }
                        }
                    }
                }
            }
        }
    }
}