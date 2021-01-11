const Discord = require("discord.js");
const conf = require("../ayarlar.json");
//Dcs Ekibi
module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed().setDescription(`${client.commands.map(props => `\`${conf.prefix}${props.help.name}\``).join("\n ")}`).setAuthor(message.author.username,message.author.displayAvatarURL()).setColor(client.randomColor()).setTimestamp().setFooter(message.guild.name + " ", message.guild.iconURL({display: true, size: 2048}));
    try {
        await message.author.send(embed)
    } catch (e) { message.channel.send(embed);
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yetkili-yardım", "help2"],
  permLevel: 0
};

module.exports.help = {
  name: 'yardım2',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: 'komutlar'
};