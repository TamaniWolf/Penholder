// DiscordJS
const Discord = require('discord.js');
const { Intents, Collection } = Discord;
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        /*Intents.FLAGS.GUILD_INTEGRATIONS,*/
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
    ], 
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"]
});
//Discord const
require('dotenv').config();
const chalk = require('chalk');
const timeFormat = 'yyyy'+'/'+'LL'+'/'+'dd'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const { DateTime } = require('luxon');
console.log('[Time]', DateTime.utc().toISO(), '[UTC]');

//Start
console.log(chalk.yellow('[NodeJS]' + chalk.white(' ▪ ▪ ▪ ▪ ▪ ', 'DiscordBot Start', ' ▪ ▪ ▪ ▪ ▪ ')));

    //Command Event Database handler
    client.commands = new Collection();
    client.cooldowns = new Collection();
    ['admin_command_handler', 'event_handler'/*, 'config_handler'*/].forEach(handler =>{
        require(`./ClanCore/Commen/handlers/${handler}`)(client, chalk, Discord);
    });
    client.moderation = new Collection();
    ['serverSpam'].forEach(mod =>{
        require(`./ClanCore/Modules/moderation/${mod}.js`)(client, chalk, Discord);
    });
    client.adminlogs = new Collection();
    ['ban', 'channelCreate', 'channelDelete', 'channelUpdate', 'kick', 'memberJoin', 'memberLeave', 'memberRoleUpdate', 'memberUpdate', 'messageDelete', 'messageUpdate', 'react', 'reactNsfw', 'roles'].forEach(log =>{
        require(`./ClanCore/Modules/logs/${log}.js`)(client, chalk, Discord);
    });

    //Login
    client.login(process.env.TOKEN);

//Error listener
client.on('unhandledRejection', error => {
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.error.unhandled), chalk.white(error));
});
client.on('shardError', error => {
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(timeFormat) + ']' + lang.error.websocket), chalk.white(error));
});

// //--------END--------//