const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const db = require('quick.db');
//Yusuf.#1310 was here!
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
if(!message.member.roles.cache.has(client.ayar.Kurucular) && !message.member.roles.cache.has(client.ayar.Yetki) && !message.member.roles.cache.has(client.ayar.Yetkililer)) return message.react(client.emoji("iptal"));
  let user = message.mentions.users.first() || client.users.cache.get(args[0])
  if(!user) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Geçerli bir kişi belirtmelisin!**`).setAuthor(message.author.username + " ", message.author.avatarURL({dynamic: true, size:2048})).setColor(client.randomColor())) //(`**Geçerli bir kişi belirtmelisin!**`).then(x => x.delete({timeout: 7000}))
  let abc = args.slice(1).join(' ')
  if(!abc) return message.channel.send(new Discord.MessageEmbed().setDescription(`**Geçerli bir isim girmelisin!**`).setAuthor(message.author.username + " ", message.author.avatarURL({dynamic: true, size:2048})).setColor(client.randomColor()))
  if(abc === "sıfırla" || abc === "reset" || abc === "yenile") {
    await(message.guild.member(user).setNickname(user.username))
    await message.react('757326604245532736')
    await message.channel.send(new Discord.MessageEmbed().setAuthor("İsim Sıfırlandı!", message.guild.iconURL()).setFooter(client.user.username, client.user.avatarURL()).setTimestamp().setThumbnail(user.avatarURL).addField('Teyit Bilgileri', `**İsmi Sıfırlanan Kullanıcı:** ${user} \n**Sıfırlayan Yetkili:** ${message.author}`))
   return
  }
  try { 
  await(message.guild.member(user).setNickname(`${abc}`))
  } catch(err) { message.reply('**Belirttiğin isim `32` karakterden uzun olmamalıdır!**') }
  await message.react('757326604245532736')
  await message.channel.send(new Discord.MessageEmbed().setDescription(`**${user} üyesinin ismi \`${abc}\` olarak ${message.author} tarafından değiştirildi!**`).setColor(client.randomColor()).setAuthor(message.author.username + " ", message.author.avatarURL({dynamic: true, size: 2048})).setFooter(message.guild.name + " ", message.guild.iconURL()).setTimestamp())
await client.channels.cache.get(client.ayar.LOG).send(new Discord.MessageEmbed().setDescription(`• Üye: ${user} \`(${user.tag} - ${user.id})\`\n• Yetkili: ${message.author} \`(${message.author.tag} - ${message.author.id})\`\n• Yeni İsim: \`${abc}\``).setAuthor('İsim Değiştirildi!').setColor(client.randomColor()).setFooter(message.guild.name + " ", message.guild.iconURL()))
db.push(`isim.${user.id}`, {
  userID: uye.id,
  isim: yazilacakIsim,
})
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['nick', 'isim'],
  permLevel: 0
};

exports.help = {
  name: 'isim [üye] [isim]',
  description: 'Etiketlenen kullanıcının ismini belirtildiği gibi yapar.',
  usage: 'isim @etiket/id <isim>',
  kategori: 'yetkili'
};
 