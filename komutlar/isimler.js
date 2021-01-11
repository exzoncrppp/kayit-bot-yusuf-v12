const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const moment = require('moment');
const db = require('quick.db');
//Yusuf.#1310 was here!
var prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {

  let embed = new MessageEmbed().setColor(client.randomColor());
  if(!message.member.roles.cache.has(client.ayar.Kurucular) && !message.member.roles.cache.has(client.ayar.Yetki) && !message.member.roles.cache.has(client.ayar.Yetkililer)) return message.react(client.emoji("iptal"));
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!uye) return message.channel.send(embed.setAuthor(message.member.displayName, message.author.avatarURL()).setDescription("Geçerli bir üye belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  var sayi = 1
  let check = await db.has(`isim.${uye.id}`)
  if (check === false) return message.channel.send(embed.setAuthor(message.member.displayName, message.author.avatarURL()).setDescription("Bu üyenin herhangi bir isim verisine ulaşamadım."))
  //args = args.filter(a => a !== "" && a !== " ").splice(1);
  let yusuf = db.get(`isim.${uye.id}`)
  let isimler = yusuf.length > 0 ? yusuf.map((value, index) => `\`${index+1}.\` \`${value.isim}\``).join("\n") :"Veri tabanında kayıtlı ismi bulunmuyor."
  //let isimler = yusuf.filter(x => x.userID === uye.id).map(x => `\`${sayi++}.\` \`${x.isim}\``).join("\n")
message.channel.send(embed.setAuthor(message.member.displayName, message.author.avatarURL()).setDescription(`${uye} üyesinin sunucuda kaydedilmiş isimleri;\n\n${isimler}`))
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['isimler'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'isimler [üye]',
    description: 'Etiketlenen kullanıcının ismini belirtildiği gibi yapar.',
    usage: 'isim @etiket/id <isim>',
    kategori: 'yetkili'
  };
   