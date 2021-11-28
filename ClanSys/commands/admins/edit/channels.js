
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
        client.getChannelNsfw = sql_ChannelRole.prepare("SELECT * FROM channel_nsfw");
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
                    for (const row_ChannelNsfw of client.getChannelNsfw.all()) {
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
                                            client.setChannelAdmin = sql_ChannelRole2.prepare("REPLACE INTO channel_admin (ChannelRoleID, Admin1, Admin2, Admin3, Admin4, Admin5, Admin6, Admin7, Admin8, Admin9, Admin10) VALUES (@ChannelRoleID, @Admin1, @Admin2, @Admin3, @Admin4, @Admin5, @Admin6, @Admin7, @Admin8, @Admin9, @Admin10);");
                                            client.setChannelNsfw = sql_ChannelRole2.prepare("REPLACE INTO channel_nsfw (ChannelRoleID, Nsfw1, Nsfw2, Nsfw3, Nsfw4, Nsfw5, Nsfw6, Nsfw7, Nsfw8, Nsfw9, Nsfw10, Nsfw11, Nsfw12, Nsfw13, Nsfw14, Nsfw15) VALUES (@ChannelRoleID, @Nsfw1, @Nsfw2, @Nsfw3, @Nsfw4, @Nsfw5, @Nsfw6, @Nsfw7, @Nsfw8, @Nsfw9, @Nsfw10, @Nsfw11, @Nsfw12, @Nsfw13, @Nsfw14, @Nsfw15);");
                                        };
                                        //
                                        // Admin
                                        if(args[0] === 'admin1') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin1;
                                                if(!dataChannelAdmin1) {
                                                    dataChannelAdmin1 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: `${args[1]}`, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin1)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin1;
                                                if(!dataChannelAdmin1) {
                                                    dataChannelAdmin1 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: `100000000000000000`, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin1)
                                            }
                                        }
                                        if(args[0] === 'admin2') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin2;
                                                if(!dataChannelAdmin2) {
                                                    dataChannelAdmin2 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: `${args[1]}`, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin2)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin2;
                                                if(!dataChannelAdmin2) {
                                                    dataChannelAdmin2 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: `100000000000000000`, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin2)
                                            }
                                        }
                                        if(args[0] === 'admin3') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin3;
                                                if(!dataChannelAdmin3) {
                                                    dataChannelAdmin3 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: `${args[1]}`, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin3)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin3;
                                                if(!dataChannelAdmin3) {
                                                    dataChannelAdmin3 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: `100000000000000000`, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin3)
                                            }
                                        }
                                        if(args[0] === 'admin4') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin4;
                                                if(!dataChannelAdmin4) {
                                                    dataChannelAdmin4 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: `${args[1]}`, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin4)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin4;
                                                if(!dataChannelAdmin4) {
                                                    dataChannelAdmin4 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: `100000000000000000`, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin4)
                                            }
                                        }
                                        if(args[0] === 'admin5') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin5;
                                                if(!dataChannelAdmin5) {
                                                    dataChannelAdmin5 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: `${args[1]}`, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin5)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin5;
                                                if(!dataChannelAdmin5) {
                                                    dataChannelAdmin5 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: `100000000000000000`, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin5)
                                            }
                                        }
                                        if(args[0] === 'admin6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin6;
                                                if(!dataChannelAdmin6) {
                                                    dataChannelAdmin6 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: `${args[1]}`, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin6;
                                                if(!dataChannelAdmin6) {
                                                    dataChannelAdmin6 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: `100000000000000000`, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin6)
                                            }
                                        }
                                        if(args[0] === 'admin7') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin7;
                                                if(!dataChannelAdmin7) {
                                                    dataChannelAdmin7 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: `${args[1]}`, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin7)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin7;
                                                if(!dataChannelAdmin7) {
                                                    dataChannelAdmin7 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: `100000000000000000`, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin7)
                                            }
                                        }
                                        if(args[0] === 'admin8') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin8;
                                                if(!dataChannelAdmin8) {
                                                    dataChannelAdmin8 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: `${args[1]}`, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin8)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin8;
                                                if(!dataChannelAdmin8) {
                                                    dataChannelAdmin8 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: `100000000000000000`, Admin9: row_ChannelAdmin.Admin9, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin8)
                                            }
                                        }
                                        if(args[0] === 'admin9') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin9;
                                                if(!dataChannelAdmin9) {
                                                    dataChannelAdmin9 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: `${args[1]}`, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin9)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin9;
                                                if(!dataChannelAdmin9) {
                                                    dataChannelAdmin9 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: `100000000000000000`, Admin10: row_ChannelAdmin.Admin10 }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin9)
                                            }
                                        }
                                        if(args[0] === 'admin10') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelAdmin10;
                                                if(!dataChannelAdmin10) {
                                                    dataChannelAdmin10 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: `${args[1]}` }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin10)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelAdmin10;
                                                if(!dataChannelAdmin10) {
                                                    dataChannelAdmin10 = { ChannelRoleID: row_ChannelAdmin.ChannelRoleID, Admin1: row_ChannelAdmin.Admin1, Admin2: row_ChannelAdmin.Admin2, Admin3: row_ChannelAdmin.Admin3, Admin4: row_ChannelAdmin.Admin4, Admin5: row_ChannelAdmin.Admin5, Admin6: row_ChannelAdmin.Admin6, Admin7: row_ChannelAdmin.Admin7, Admin8: row_ChannelAdmin.Admin8, Admin9: row_ChannelAdmin.Admin9, Admin10: `${args[1]}` }
                                                }
                                                client.setChannelAdmin.run(dataChannelAdmin10)
                                            }
                                        }
                                        //
                                        // NSFW
                                        if(args[0] === 'nsfw1') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw1;
                                                if(!dataChannelNsfw1) {
                                                    dataChannelNsfw1 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: `${args[1]}`, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw1)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw1;
                                                if(!dataChannelNsfw1) {
                                                    dataChannelNsfw1 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: `100000000000000000`, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw1)
                                            }
                                        }
                                        if(args[0] === 'nsfw2') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw2;
                                                if(!dataChannelNsfw2) {
                                                    dataChannelNsfw2 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: `${args[1]}`, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw2)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw2;
                                                if(!dataChannelNsfw2) {
                                                    dataChannelNsfw2 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: `100000000000000000`, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw2)
                                            }
                                        }
                                        if(args[0] === 'nsfw3') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw3;
                                                if(!dataChannelNsfw3) {
                                                    dataChannelNsfw3 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: `${args[1]}`, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw3)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw3;
                                                if(!dataChannelNsfw3) {
                                                    dataChannelNsfw3 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: `100000000000000000`, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw3)
                                            }
                                        }
                                        if(args[0] === 'nsfw4') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw4;
                                                if(!dataChannelNsfw4) {
                                                    dataChannelNsfw4 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: `${args[1]}`, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw4)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw4;
                                                if(!dataChannelNsfw4) {
                                                    dataChannelNsfw4 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: `100000000000000000`, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw4)
                                            }
                                        }
                                        if(args[0] === 'nsfw5') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw5;
                                                if(!dataChannelNsfw5) {
                                                    dataChannelNsfw5 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: `${args[1]}`, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw5)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw5;
                                                if(!dataChannelNsfw5) {
                                                    dataChannelNsfw5 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: `100000000000000000`, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw5)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: `${args[1]}`, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: `100000000000000000`, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw7') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw7;
                                                if(!dataChannelNsfw7) {
                                                    dataChannelNsfw7 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: `${args[1]}`, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw7)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw7;
                                                if(!dataChannelNsfw7) {
                                                    dataChannelNsfw7 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: `100000000000000000`, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw7)
                                            }
                                        }
                                        if(args[0] === 'nsfw8') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw8;
                                                if(!dataChannelNsfw8) {
                                                    dataChannelNsfw8 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: `${args[1]}`, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw8)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw8;
                                                if(!dataChannelNsfw8) {
                                                    dataChannelNsfw8 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: `100000000000000000`, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw8)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: `${args[1]}`, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: `100000000000000000`, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: `${args[1]}`, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: `100000000000000000`, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: `${args[1]}`, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: `100000000000000000`, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: `${args[1]}`, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: `100000000000000000`, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: `${args[1]}`, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: `100000000000000000`, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: `${args[1]}`, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: `100000000000000000`, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                        if(args[0] === 'nsfw6') {
                                            if(typeof args[1] != "number" ) {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: row_ChannelNsfw.Nsfw15 }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            } else if(args[1] === 'delete') {
                                                let dataChannelNsfw6;
                                                if(!dataChannelNsfw6) {
                                                    dataChannelNsfw6 = { ChannelRoleID: row_ChannelNsfw.ChannelRoleID, Nsfw1: row_ChannelNsfw.Nsfw1, Nsfw2: row_ChannelNsfw.Nsfw2, Nsfw3: row_ChannelNsfw.Nsfw3, Nsfw4: row_ChannelNsfw.Nsfw4, Nsfw5: row_ChannelNsfw.Nsfw5, Nsfw6: row_ChannelNsfw.Nsfw6, Nsfw7: row_ChannelNsfw.Nsfw7, Nsfw8: row_ChannelNsfw.Nsfw8, Nsfw9: row_ChannelNsfw.Nsfw9, Nsfw10: row_ChannelNsfw.Nsfw10, Nsfw11: row_ChannelNsfw.Nsfw11, Nsfw12: row_ChannelNsfw.Nsfw12, Nsfw13: row_ChannelNsfw.Nsfw13, Nsfw14: row_ChannelNsfw.Nsfw14, Nsfw15: `100000000000000000` }
                                                }
                                                client.setChannelNsfw.run(dataChannelNsfw6)
                                            }
                                        }
                                    }
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