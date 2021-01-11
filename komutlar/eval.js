const Discord = require("discord.js");
const moment = require("moment");
const db  = require("quick.db")
require("moment-duration-format")
const request = require("syncrequest")
exports.run = async (client, message, args, color) => {
  let arr = ["518104479317360663"]
  if (!arr.includes(message.author.id)) return;
  if (!args[0] || args[0].includes("token"))
    return message.channel.send(
      `Bir kod yazmalısın !sy __\`<kod>\`__`
    );
  const code = args.join(" ");
  try {
    var evaled = clean(await eval(code));
    if (evaled.match(new RegExp(`${client.token}`, "g")))
      evaled = evaled
        .replace("token", "Verdim tokeni hissettin mi kardeşim")
        .replace(client.token, "Verdim tokeni hissettin mi kardeşim")
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "Verdim tokeni hissettin mi kardeşim"
        )
    message.channel.send(
      `${evaled
        .replace(client.token, "Verdim tokeni hissettin mi kardeşim")
        .replace(
          process.env.PROJECT_INVITE_TOKEN,
          "Verdim tokeni hissettin mi kardeşim"
        )
        .replace("token", "Verdim tokeni hissetin mi kardeşim")}`,
      { code: "js", split: true }
    );
  } catch (err) {
    message.channel.send(err, { code: "js", split: true });
  }
function clean(text) {
    if (typeof text !== "string")
      text = require("util").inspect(text, { depth: 0 });
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
    return text;
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sy'],
    permLevel: 0
  };
  
  exports.help = {
    name: 'sy [kod]',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval <kod>',
    kategori: 'sahip'
  };