const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'info',
    aliases: ['information', 'get'],
    description: 'information',
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
        client.getCommandAdmin = sql_Onoff.prepare("SELECT * FROM command_admin");
        client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
        for (const row_lang of client.getLang.all()) {
            let lang = require('../../../.' + row_lang.LangSet);
            for (const row_ChannelAdmin of client.getCommandAdmin.all()) {
                if(row_ChannelAdmin.Info === 'true') {
                    if(!args[0]) {
                        return message.channel.send('?');
                    }
                    if(args[0] === 'user' || args[0] === 'member' || args[0] === 'player') {
                        const infoUserEmbed = new MessageEmbed()
                        .setColor('DARK_GREEN')
                        .setTitle('User Info')
                        if(!args[1]) {
                            const member = message.member;
                            infoUserEmbed
                            .setAuthor(member.user.tag, member.user.avatarURL({dynamic: true, size: 512}))
                            .setThumbnail(member.user.avatarURL({dynamic: true, size: 512}))
                            .addField("ID", `${member.user.id}`)
                            .addField("Roles", `${member.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`)
                            .addField("Joined as Member", `<t:${parseInt(member.joinedTimestamp / 1000)}:R>`, true)
                            .addField("Joined as Discord User", `<t:${parseInt(member.user.createdTimestamp / 1000)}:R>`);
                            message.reply({embeds: [infoUserEmbed], ephemeral: true});
                        } else if(args[1]) {
                            const taggedUser = message.mentions.users.first();
                            let guildId = message.guild.id;
                            let guild = client.guilds.cache.get(guildId);
                            let memberTagged = guild.members.cache.get(taggedUser.id);
                            infoUserEmbed
                            .setAuthor(memberTagged.user.tag, memberTagged.user.avatarURL({dynamic: true, size: 512}))
                            .setThumbnail(memberTagged.user.avatarURL({dynamic: true, size: 512}))
                            .addField("ID", `${memberTagged.user.id}`)
                            .addField("Roles", `${memberTagged.roles.cache.map(r => r).join(" ").replace("@everyone", " ") || "None"}`)
                            .addField("Joined as Member", `<t:${parseInt(memberTagged.joinedTimestamp / 1000)}:R>`, true)
                            .addField("Joined as Discord User", `<t:${parseInt(memberTagged.user.createdTimestamp / 1000)}:R>`);
                            message.reply({embeds: [infoUserEmbed], ephemeral: true});
                        }
                    } if(args[0] === 'server' || args[0] === 'guild' || args[0] === 'community') {
                        const infoServerEmbed = new MessageEmbed()
                        .setColor('DARK_GREEN')
                        .setTitle('Server Info')
                        if(!args[1]) {
                            let guildId = message.guild.id;
                            let guild = client.guilds.cache.get(guildId);
                            let owner = guild.members.cache.get(guild.ownerId);
                            infoServerEmbed
                            .setAuthor(guild.name, guild.iconURL({dynamic: true, size: 512}))
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addField("ID", `${guild.id}`)
                            .addField("Owner", `${owner.user.username} ${owner.user.discriminator}`)
                            .addField("Member Count", `${guild.memberCount}`)
                            .addField("Server Created", `<t:${parseInt(guild.createdTimestamp / 1000)}:R>`);
                            message.reply({embeds: [infoServerEmbed], ephemeral: true});
                        }
                    } if(args[0] === 'channel' || args[0] === 'chat') {
                        const infoChannelEmbed = new MessageEmbed()
                        .setColor('DARK_GREEN')
                        .setTitle('Channel Info')
                        if(!args[1]) {
                            let guildId = message.guild.id;
                            let channelId = message.channel.id;
                            let guild = client.guilds.cache.get(guildId);
                            let channelInfo = guild.channels.cache.get(channelId);
                            let category = guild.channels.cache.get(channelInfo.parentId);
                            infoChannelEmbed
                            .setAuthor(guild.name, guild.iconURL({dynamic: true, size: 512}))
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addField("ID", `${channelInfo.id}`)
                            .addField("Name", `<#${channelInfo.id}>`)
                            .addField("In Category", `${category.name}`)
                            .addField("Topic", `${channelInfo.topic || "None"}`)
                            .addField("NSFW", `${channelInfo.nsfw}`)
                            .addField("Channel Created", `<t:${parseInt(channelInfo.createdTimestamp / 1000)}:R>`);
                            message.reply({embeds: [infoChannelEmbed], ephemeral: true});
                        } else if(args[1]) {
                            let channelId = args[1];
                            let guildId = message.guild.id;
                            let guild = client.guilds.cache.get(guildId);
                            let channelInfo = guild.channels.cache.get(channelId);
                            let category = guild.channels.cache.get(channelInfo.parentId);
                            infoChannelEmbed
                            .setAuthor(guild.name, guild.iconURL({dynamic: true, size: 512}))
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addField("ID", `${channelInfo.id}`)
                            .addField("Name", `<#${channelInfo.id}>`)
                            .addField("In Category", `${category.name}`)
                            .addField("Topic", `${channelInfo.topic || "None"}`)
                            .addField("NSFW", `${channelInfo.nsfw}`)
                            .addField("Channel Created", `<t:${parseInt(channelInfo.createdTimestamp / 1000)}:R>`);
                            message.reply({embeds: [infoChannelEmbed], ephemeral: true});
                        }
                    } if(args[0] === 'message') {
                        const infoMessageEmbed = new MessageEmbed()
                        .setColor('DARK_GREEN')
                        .setTitle('Message Info')
                        if(!args[1]) {
                            let author = message.author;
                            let guildId = message.guild.id;
                            let guild = client.guilds.cache.get(guildId);
                            infoMessageEmbed
                            .setAuthor(guild.name, guild.iconURL({dynamic: true, size: 512}))
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addField("ID", `${message.id}`)
                            .addField("Author", `${author.tag}`)
                            .addField("In Channel", `${message.channel}`)
                            .addField("Content", `${message.content || "None/Embed"}`)
                            .addField("Message Created", `<t:${parseInt(message.createdTimestamp / 1000)}:R>`);
                            message.reply({embeds: [infoMessageEmbed], ephemeral: true});
                        } else if(args[1]) {
                            let guildId = message.guild.id;
                            let channelInfoId = message.channel.id;
                            let guild = client.guilds.cache.get(guildId);
                            let channelInfo = guild.channels.cache.get(channelInfoId);
                            let messageInfo = channelInfo.messages.fetch(args[1]);
                            let messageAwait = await messageInfo;
                            infoMessageEmbed
                            .setAuthor(guild.name, guild.iconURL({dynamic: true, size: 512}))
                            .setThumbnail(guild.iconURL({dynamic: true, size: 512}))
                            .addField("ID", `${messageAwait.id}`)
                            .addField("Author", `${messageAwait.author.username} ${messageAwait.author.discriminator}`)
                            .addField("In Channel", `<#${messageAwait.channelId}>`)
                            .addField("Content", `${messageAwait.content || "None/Embed"}`)
                            .addField("Message Created", `<t:${parseInt(messageAwait.createdTimestamp / 1000)}:R>`);
                            await message.reply({embeds: [infoMessageEmbed], ephemeral: true});
                        }
                    } if(args[0] === 'image' || args[0] === 'picture') {
                        return message.channel.send('?').then(console.log('Image'));
                    } if(args[0] === 'video') {
                        return message.channel.send('?').then(console.log('video'));
                    } if(args[0] === 'gif' || args[0] === 'animation') {
                        return message.channel.send('?').then(console.log('gif'));
                    } if(args[0] === 'url' || args[0] === 'link' || args[0] === 'website') {
                        return message.channel.send('?').then(console.log('url'));
                    } if(args[0] === 'sexy') {
                        return message.channel.send('?').then(console.log('sexy'));
                    };
                }
            }
        }
    }
};