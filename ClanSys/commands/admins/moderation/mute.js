const { MessageEmbed } = require('discord.js');
const configmain = require('../../../config/config.json');
require('dotenv').config();

module.exports = {
    name: 'mute',
    aliases: ['unvoice'],
    description: 'mute someone',
    async execute(message, args, commandName, chalk, client, Discord) {
        const taggedUser = message.mentions.members.first();
        const tagged = `<@!${tagged.user.id}>`;
        if(!args[0]) {
            message.reply(`Use \`${process.env.PREFIX}ban username 'USERNAME'\``);
        };
        if(args[0] === tagged) {
            let rName = client.guilds.cache.get(configmain.mainguild).roles.cache.find(rName => rName.id === configmain.muterole);
            taggedUser.roles.add(rName)
        };
    }
};