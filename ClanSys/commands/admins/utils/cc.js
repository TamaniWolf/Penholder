const { MessageEmbed } = require('discord.js');
require('dotenv').config();
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';

module.exports = {
    name: 'cc',
    aliases: ['cccc'],
    description: 'cc, cccc',
    guildOnly: true,
    async execute(message, args, commandName, chalk, client, Discord) {
        const timer = ms => new Promise( res => setTimeout(res, ms));
        const SQLite = require("better-sqlite3");
        const sql_ChannelRole = new SQLite('./Database/sqlite/config/channelRole.sqlite');
        client.getRoleAdmin = sql_ChannelRole.prepare("SELECT * FROM role_admin");

                    //code start

                        for (const row_configOnoffRole of client.getRoleAdmin.all()) {
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
                            const changeNickname = new MessageEmbed()
                            if(message.member.roles.cache.has(admin1) || message.member.roles.cache.has(admin2) || message.member.roles.cache.has(admin3) || message.member.roles.cache.has(admin4) || message.member.roles.cache.has(admin5) || message.member.roles.cache.has(admin6) || message.member.roles.cache.has(admin7) || message.member.roles.cache.has(admin8) || message.member.roles.cache.has(admin9) || message.member.roles.cache.has(admin10)) {
                                changeNickname.setColor('DEFAULT')
                                        .setDescription(`DEFAULT`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('AQUA')
                                        .setDescription(`AQUA`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_AQUA')
                                        .setDescription(`DARK_AQUA`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('GREEN')
                                        .setDescription(`GREEN`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_GREEN')
                                        .setDescription(`DARK_GREEN`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('BLUE')
                                        .setDescription(`BLUE`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_BLUE')
                                        .setDescription(`DARK_BLUE`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('PURPLE')
                                        .setDescription(`PURPLE`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_PURPLE')
                                        .setDescription(`DARK_PURPLE`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('LUMINOUS_VIVID_PINK')
                                        .setDescription(`LUMINOUS_VIVID_PINK`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_VIVID_PINK')
                                        .setDescription(`DARK_VIVID_PINK`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('GOLD')
                                        .setDescription(`GOLD`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_GOLD')
                                        .setDescription(`DARK_GOLD`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('ORANGE')
                                        .setDescription(`ORANGE`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_ORANGE')
                                        .setDescription(`DARK_ORANGE`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('RED')
                                        .setDescription(`RED`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_RED')
                                        .setDescription(`DARK_RED`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('GREY')
                                        .setDescription(`GREY`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_GREY')
                                        .setDescription(`DARK_GREY`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARKER_GREY')
                                        .setDescription(`DARKER_GREY`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('LIGHT_GREY')
                                        .setDescription(`LIGHT_GREY`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('NAVY')
                                        .setDescription(`NAVY`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('DARK_NAVY')
                                        .setDescription(`DARK_NAVY`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});
                                timer(2000);
                                changeNickname.setColor('YELLOW')
                                        .setDescription(`YELLOW`)
                                client.channels.cache.get('846716632155816016').send({embeds: [changeNickname]});

                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.clear.errorperms)));
                            }
                        
                    
                
            }
        }
    
}
