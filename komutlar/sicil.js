const Discord = require('discord.js');
const moment = require("moment");
const db = require('quick.db');

exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(client.ayar.Kurucular) && !message.member.roles.cache.has(client.ayar.Yetki) && !message.member.roles.cache.has(client.ayar.Yetkililer)) return message.react('❌');
  let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

    
let uye = message.mentions.users.first() || message.author;
let bilgi = db.get(`yetkili.${uye.id}`);
  
  let isim = bilgi.isim || 0;
  let erkek = bilgi.erkek || 0;
  let kiz = bilgi.kiz || 0; 


  let toplam = erkek+kiz

  
    const embed = new Discord.MessageEmbed()
    .setColor(client.randomColor())
    .setThumbnail(uye.avatarURL({dynamic: true, size: 2048}))
    .setAuthor(`${uye.tag} (${uye.id})`, uye.avatarURL({dynamic: true, size: 2048}))
    .setDescription(`${uye} yetkilisinin **Kayıt** bilgileri;`)
    .addField(`**Kayıt Bilgileri**`, `\`•\` Toplam: \`${toplam ? toplam :"0"}\`\n\`-\` Erkek Kayıt Sayısı: \`${erkek ? erkek :"0"}\n\`-\` Kız Kayıt Sayısı: \`${kiz ? kiz :"0"}\``)
    //.setFooter(message.guild.name + " ", message.guild.iconURL({dynamic: true}))
    //.setTimestamp()
    message.channel.send(embed).catch()
    
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['yetkili-bilgi', 'sicil', 'kayıtbilgi'],
  permLevel: 0,
};

exports.help = {
  name: 'sicil [üye]',
  description: 'Belirttilen kullanıcının bilgilerini gösterir.',
  usage: 'kullanıcıbilgi @üye',
  kategori: 'kullanıcı'
};
