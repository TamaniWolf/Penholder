
// require('dotenv').config();

// module.exports = (client, chalk, message, args) => {
//     const SQLite = require("better-sqlite3");
//     const sql_autoban = new SQLite('./Database/sqlite/moderation/moderation.sqlite');
//     const sql_Onoff = new SQLite('./Database/sqlite/config/onoff.sqlite');
//     client.getLang = sql_Onoff.prepare("SELECT * FROM lang");
//     for (const row_lang of client.getLang.all()) {
//         let lang = require('../../.' + row_lang.LangSet);
//         client.on("guildMemberAdd", member => {
//             member.t
//         })
//     };
// };