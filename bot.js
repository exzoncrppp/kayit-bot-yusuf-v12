const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');



var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

//KOMUTLAR BURAYA
client.ayar = {
    "SunucuID": "guildID",
    "Kurucular": "yetkili rol id3",
    "Yetkililer": "yetkili rol id2",
    "Yetki": "yetkili rol id",
    "TeyitsizRolü": "kayıtsız rol id",
    "kiz": "kız rol id",
    "erkek": "erkek rol id",
    "LOG": "log kanalı id",
    "genelsohbet": "chat kanalı id",
    
  }


  client.renk = {
    //"renksiz": "2F3136", // 0x36393E
  "kırmızı": "#ff0000",
  "turkuaz": "#00ffdd",
  //böyle böyle istediğinz renkleri arttırın embed kutusunun rengi değişir :sunglaso:
  };
  
  client.randomColor = function () {
    return client.renk[Object.keys(client.renk).random()];
  };
  
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  };



  client.emojiler = { // emojilerinizin idsini girin bir yerde kkullanıcağınızda ${client.emoji("emoji ismi")}
    onay: "747355909948440578",
    iptal: "747355910975782994",
    cevrimici: "756691181001244823",
    rahatsizetmeyin: "756691108624597095",
    bosta: "756691160969248821",
    gorunmez: "756691139603595297",
    erkekEmoji: "747355948623986708",
    kizEmoji: "740922172427599935",
    gif1: "784350302475517953",
    gif2: "747355963635400744",
    gif3: "784350165146140672",
    gif4: "747355971025895424"
   
  };

  global.emoji = client.emoji = function(x) {
    return client.emojis.cache.get(client.emojiler[x]);
  };

  

//KOMUTLAR BİTİŞ
client.login(ayarlar.token);

