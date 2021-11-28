const { MessageEmbed } = require('discord.js');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
require('dotenv').config();

module.exports = {
    name: 'edit',
    description: 'editing stuff',
    guildOnly: true,
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
        const sql_ChannelRole = new SQLite('./Database/sqlite/config/channelRole.sqlite');
        client.getCommandAdmin = sql_Onoff.prepare("SELECT * FROM command_admin");
        client.getChannelAdmin = sql_ChannelRole.prepare("SELECT * FROM channel_admin");
        client.getRoleAdmin = sql_ChannelRole.prepare("SELECT * FROM role_admin");
        client.getRoleNsfw = sql_ChannelRole.prepare("SELECT * FROM role_nsfw");
        client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
        for (const row_lang of client.getLang./*iterate*/all()) {
            let lang = require('../../../.' + row_lang.LangSet);
            for (const row_ChannelAdmin of client.getCommandAdmin./*iterate*/all()) {
                if(row_ChannelAdmin.Editconfig === 'true') {
                    //read config data
                    let prefix = process.env.PREFIX;
                    //code start
                    for (const row_ChannelAdmin of client.getChannelAdmin./*iterate*/all()) {
                        for (const row_RoleAdmin of client.getRoleAdmin./*iterate*/all()) {
                        for (const row_RoleNsfw of client.getRoleNsfw./*iterate*/all()) {
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
                                    if(client) {
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
                                        const sql_ChannelRole2 = new SQLite('./Database/sqlite/config/channelRole.sqlite');
                                        if(client) {
                                            client.setRoleAdmin = sql_ChannelRole2.prepare("REPLACE INTO role_admin (ChannelRoleID, Admin1, Admin2, Admin3, Admin4, Admin5, Admin6, Admin7, Admin8, Admin9, Admin10) VALUES (@ChannelRoleID, @Admin1, @Admin2, @Admin3, @Admin4, @Admin5, @Admin6, @Admin7, @Admin8, @Admin9, @Admin10);");
                                            client.setRoleNsfw = sql_ChannelRole2.prepare("REPLACE INTO role_nsfw (ChannelRoleID, Nsfw1, Nsfw2, Nsfw3, Nsfw4, Nsfw5, Nsfw6) VALUES (@ChannelRoleID, @Nsfw1, @Nsfw2, @Nsfw3, @Nsfw4, @Nsfw5, @Nsfw6);");
                                        };
                                        //
                                        // Admin
                                        if(args[0] === 'admin1') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin1;
                                                if(!dataRoleAdmin1) {
                                                    dataRoleAdmin1 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: `${args[1]}`, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin1)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin1;
                                                if(!dataRoleAdmin1) {
                                                    dataRoleAdmin1 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: `100000000000000000`, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin1)
                                            }
                                        }
                                        if(args[0] === 'admin2') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin2;
                                                if(!dataRoleAdmin2) {
                                                    dataRoleAdmin2 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: `${args[1]}`, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin2)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin2;
                                                if(!dataRoleAdmin2) {
                                                    dataRoleAdmin2 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: `100000000000000000`, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin2)
                                            }
                                        }
                                        if(args[0] === 'admin3') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin3;
                                                if(!dataRoleAdmin3) {
                                                    dataRoleAdmin3 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: `${args[1]}`, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin3)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin3;
                                                if(!dataRoleAdmin3) {
                                                    dataRoleAdmin3 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: `100000000000000000`, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin3)
                                            }
                                        }
                                        if(args[0] === 'admin4') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin4;
                                                if(!dataRoleAdmin4) {
                                                    dataRoleAdmin4 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: `${args[1]}`, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin4)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin4;
                                                if(!dataRoleAdmin4) {
                                                    dataRoleAdmin4 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: `100000000000000000`, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin4)
                                            }
                                        }
                                        if(args[0] === 'admin5') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin5;
                                                if(!dataRoleAdmin5) {
                                                    dataRoleAdmin5 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: `${args[1]}`, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin5)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin5;
                                                if(!dataRoleAdmin5) {
                                                    dataRoleAdmin5 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: `100000000000000000`, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin5)
                                            }
                                        }
                                        if(args[0] === 'admin6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin6;
                                                if(!dataRoleAdmin6) {
                                                    dataRoleAdmin6 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: `${args[1]}`, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin6)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin6;
                                                if(!dataRoleAdmin6) {
                                                    dataRoleAdmin6 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: `100000000000000000`, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin6)
                                            }
                                        }
                                        if(args[0] === 'admin7') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin7;
                                                if(!dataRoleAdmin7) {
                                                    dataRoleAdmin7 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: `${args[1]}`, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin7)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin7;
                                                if(!dataRoleAdmin7) {
                                                    dataRoleAdmin7 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: `100000000000000000`, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin7)
                                            }
                                        }
                                        if(args[0] === 'admin8') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin8;
                                                if(!dataRoleAdmin8) {
                                                    dataRoleAdmin8 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: `${args[1]}`, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin8)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin8;
                                                if(!dataRoleAdmin8) {
                                                    dataRoleAdmin8 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: `100000000000000000`, Admin9: row_RoleAdmin.Admin9, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin8)
                                            }
                                        }
                                        if(args[0] === 'admin9') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin9;
                                                if(!dataRoleAdmin9) {
                                                    dataRoleAdmin9 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: `${args[1]}`, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin9)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin9;
                                                if(!dataRoleAdmin9) {
                                                    dataRoleAdmin9 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: `100000000000000000`, Admin10: row_RoleAdmin.Admin10 }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin9)
                                            }
                                        }
                                        if(args[0] === 'admin10') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleAdmin10;
                                                if(!dataRoleAdmin10) {
                                                    dataRoleAdmin10 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: `${args[1]}` }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin10)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleAdmin10;
                                                if(!dataRoleAdmin10) {
                                                    dataRoleAdmin10 = { ChannelRoleID: row_RoleAdmin.ChannelRoleID, Admin1: row_RoleAdmin.Admin1, Admin2: row_RoleAdmin.Admin2, Admin3: row_RoleAdmin.Admin3, Admin4: row_RoleAdmin.Admin4, Admin5: row_RoleAdmin.Admin5, Admin6: row_RoleAdmin.Admin6, Admin7: row_RoleAdmin.Admin7, Admin8: row_RoleAdmin.Admin8, Admin9: row_RoleAdmin.Admin9, Admin10: `${args[1]}` }
                                                }
                                                client.setRoleAdmin.run(dataRoleAdmin10)
                                            }
                                        }
                                        //
                                        // NSFW
                                        if(args[0] === 'nsfw1') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleNsfw1;
                                                if(!dataRoleNsfw1) {
                                                    dataRoleNsfw1 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: `${args[1]}`, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw1)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleNsfw1;
                                                if(!dataRoleNsfw1) {
                                                    dataRoleNsfw1 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: `100000000000000000`, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw1)
                                            }
                                        }
                                        if(args[0] === 'nsfw2') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleNsfw2;
                                                if(!dataRoleNsfw2) {
                                                    dataRoleNsfw2 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: `${args[1]}`, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw2)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleNsfw2;
                                                if(!dataRoleNsfw2) {
                                                    dataRoleNsfw2 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: `100000000000000000`, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw2)
                                            }
                                        }
                                        if(args[0] === 'nsfw3') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleNsfw3;
                                                if(!dataRoleNsfw3) {
                                                    dataRoleNsfw3 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: `${args[1]}`, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw3)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleNsfw3;
                                                if(!dataRoleNsfw3) {
                                                    dataRoleNsfw3 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: `100000000000000000`, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw3)
                                            }
                                        }
                                        if(args[0] === 'nsfw4') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleNsfw4;
                                                if(!dataRoleNsfw4) {
                                                    dataRoleNsfw4 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: `${args[1]}`, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw4)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleNsfw4;
                                                if(!dataRoleNsfw4) {
                                                    dataRoleNsfw4 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: `100000000000000000`, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw4)
                                            }
                                        }
                                        if(args[0] === 'nsfw5') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleNsfw5;
                                                if(!dataRoleNsfw5) {
                                                    dataRoleNsfw5 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: `${args[1]}`, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw5)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleNsfw5;
                                                if(!dataRoleNsfw5) {
                                                    dataRoleNsfw5 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: `100000000000000000`, Nsfw6: row_RoleNsfw.Nsfw6 }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw5)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataRoleNsfw6;
                                                if(!dataRoleNsfw6) {
                                                    dataRoleNsfw6 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: `${args[1]}` }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataRoleNsfw6;
                                                if(!dataRoleNsfw6) {
                                                    dataRoleNsfw6 = { ChannelRoleID: row_RoleNsfw.ChannelRoleID, Nsfw1: row_RoleNsfw.Nsfw1, Nsfw2: row_RoleNsfw.Nsfw2, Nsfw3: row_RoleNsfw.Nsfw3, Nsfw4: row_RoleNsfw.Nsfw4, Nsfw5: row_RoleNsfw.Nsfw5, Nsfw6: `100000000000000000` }
                                                }
                                                client.setRoleNsfw.run(dataRoleNsfw6)
                                            }
                                        }
                                    }

                                    // console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.log)));
                                } else {
                                    console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.errorperms)));
                                }
                            } else {
                                console.log(chalk.cyan('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.prefix.clan, chalk.white(lang.admin.ping.errorchannel)));
                            }
                        }}
                    }
                }
            }
        }
    }
}