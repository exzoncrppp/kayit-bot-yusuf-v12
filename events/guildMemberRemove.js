const Discord = require("discord.js");
const client = new Discord.Client();

client.on("guildMemberRemove", (member, message) => {
  member.send(`Olamaz! Sunucumuzdan ayrıldıgını gördüm :( umarım tekrardan gelirsin!`)
})