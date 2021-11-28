
const { readdirSync } = require('fs');
const { DateTime } = require('luxon');
const timeFormat = 'LL'+'/'+'dd'+'/'+'yyyy'+'-'+'h'+':'+'mm'+':'+'ss'+'-'+'a';
const configmain = require('../../../ClanSys/config/config.json');

module.exports = (client, chalk, Discord) =>{
    const SQLite = require("better-sqlite3");
    const sql_Config = new SQLite('./Database/sqlite/config/channelRole.sqlite');
    if(client) {
        client.getConfig = sql_Config.prepare("SELECT * FROM channel_config WHERE ChannelRoleID = ?");
        client.getChannel = sql_Config.prepare("SELECT * FROM channel_config WHERE ChannelRoleID = ?");
        client.setConfig = sql_Config.prepare("REPLACE INTO channel_config (ChannelRoleID, Log1, Log2, Log3) VALUES (@ChannelRoleID, @Log1, @Log2, @Log3);");
    }
    // let dataConfig;
    dataConfig = client.getConfig.get("7")
    dataConfig = { ChannelRoleID: dataConfig.ChannelRoleID, Log1: configmain.logchannelid, Log2: configmain.logchannelid2, Log3: configmain.logchannelid3 }
    client.setConfig.run(dataConfig);
    // console.log(dataConfig.Log2)
    console.log(chalk.yellow('[' + DateTime.utc().toFormat(timeFormat) + '][Discord]', chalk.white('Config Heandler loaded + Executed')));
};