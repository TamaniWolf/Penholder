
const configmain = require('../../../config/config.json');
require('dotenv').config();

module.exports = {
    name: 'unmute',
    aliases: ['voice'],
    description: 'unmute someone',
    async execute(message, args, commandName, chalk, client, Discord) {
        const taggedUser = message.mentions.members.first();
        const tagged = `<@!${tagged.user.id}>`
        const guild = client.guilds.get(configmain.mainguild);
        
        if(!args[0]) {
            message.reply(`Use \`${process.env.PREFIX}unmute '@USERNAME'\``);
        };
        if(args[0] === 'username') {
            
        } else if(args[0] === tagged) {
            taggedUser.roles.remove(configmain.muterole);
        };
    }
};