const { MessageEmbed } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: 'kick',
    aliases: ['kickhammer', 'yeet'],
    description: 'kicken',
    async execute(message, args, commandName, chalk, client, Discord) {
        const taggedUser = message.mentions.members.first();
        const tagged = `<@!${tagged.user.id}>`
        if(!args[0]) {
            message.reply(`Use \`${process.env.PREFIX}kick '@USERNAME'\``);
        } else if(args[0] === tagged) {
            taggedUser.kick();
        };
    }
};