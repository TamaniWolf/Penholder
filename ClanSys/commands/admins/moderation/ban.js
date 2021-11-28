const { MessageEmbed } = require('discord.js');
const configmain = require('../../../config/config.json');
require('dotenv').config();

module.exports = {
    name: 'ban',
    aliases: ['banhammer', 'gazuga', 'boot'],
    description: 'bannen',
    async execute(message, args, commandName, chalk, client, Discord) {
        const SQLite = require("better-sqlite3");
        const sql_ban = new SQLite('./Database/sqlite/moderation/moderation.sqlite');
        client.getban = sql_ban.prepare("SELECT * FROM autobanid WHERE UserName = ?");
        client.setban = sql_ban.prepare("INSERT OR REPLACE INTO autobanid (UserName, GuildID) VALUES (@UserName, @GuildID);");
        let text = args.slice(1).join(" ");
        const taggedUser = message.mentions.members.first();
        const tagged = `<@!${taggedUser.user.id}>`
        if(!args[0]) {
            message.reply(`Use \`${process.env.PREFIX}ban username 'USERNAME'\` or \`${process.env.PREFIX}ban '@USERNAME'\``);
        };
        if(args[0] === 'username') {
            const guildID = client.guilds.cache.get(configmain.mainguild)
            if(text) {
                let databan;
                databan = client.getban.get(text);
                if(!databan) {
                    databan = { UserName: `${text}`, GuildID: `${guildID.id}` };
                };
                client.setban.run(databan);
            };
        } else if(args[0] === tagged) {
            taggedUser.ban()
        };
    }
};