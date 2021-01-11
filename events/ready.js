const chalk = require("chalk");
const moment = require("moment");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");

var prefix = ayarlar.prefix;

module.exports = client => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  console.log(`${client.users.cache.get(ayarlar.sahip).tag} was here!`)
  client.user.setStatus("dnd");
 client.user.setActivity(`${client.users.cache.get(ayarlar.sahip).tag} was here!`);


  client.channels.cache.get("katılmasını istediğin ses kanalı id").join()

};
