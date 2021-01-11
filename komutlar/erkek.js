const { MessageEmbed } = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');

var prefix = ayarlar.prefix;
// Yusuf.#1310 was here!

exports.run = async (client, message, args) => {
  let embed = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setFooter(message.guild.name + " ", message.guild.iconURL({dynamic: true})).setColor(client.randomColor()).setTimestamp();
    if(!message.member.roles.cache.has(client.ayar.Kurucular) && !message.member.roles.cache.has(client.ayar.Yetki) && !message.member.roles.cache.has(client.ayar.Yetkililer)) return message.react('❌');
  let user = message.mentions.users.first() || client.users.cache.get(args[0]);
  if(!user) return message.channel.send(embed.setDescription(`**Geçerli bir kişi belirtmelisin!**`))

  if(message.guild.member(user).roles.cache.has(client.ayar.TeyitsizRolü)) {
    await(message.guild.member(user).roles.remove(client.ayar.TeyitsizRolü))
  }  
  
  await(message.guild.member(user).roles.add(client.ayar.erkek));
  await message.react(client.emoji("onay"))
  await message.channel.send(embed.setDescription(`${user}** kullanıcısına** ${message.guild.roles.cache.get(client.ayar.erkek)}** rolü verildi!**`))
  await client.channels.cache.get(client.ayar.genelsohbet).send(`**Merhaba ${user} ${message.guild.name} Resmî Discord Sunucusuna Hoş geldin! :tada:** Burada Sohbet Edebilir, <#719715912348860517> Kanalından Önemli Gelişmeleri Takip Edebilirsin. <#719715723114577941> Kanalını Okumayı Unutma Lütfen.`)
  await client.channels.cache.get(client.ayar.LOG).send(embed.setDescription(`**• Rol Verilen Üye: ${user} \`(${user.tag} - ${user.id})\`\n• Rol Veren Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`\n• Verilen Rol: ${message.guild.roles.cache.get(client.ayar.erkek)}**`))
db.add(`yetkili.${message.author.id}.erkek`, 1);
};

exports.conf = { 
  enabled: true,
  guildOnly: true,
  aliases: ['erkek', 'e', 'man'],
  permLevel: 0
};

exports.help = {
  name: 'erkek [üye/id]',
  description: 'Etiketlenen kullanıcıya erkek permi verir.',
  usage: 'erkek @etiket/id',
  kategori: 'yetkili'
};