const Discord = require("discord.js") //baixar a lib
const client = new Discord.Client()
const { Client, MessageAttachment } = require('discord.js')
const config = require("./config.json")
const request = require('request')
const http = require('http')
const fs = require('fs')
const rp = require('request-promise')
const cheerio = require('cheerio')


client.on("ready", () => {
  console.log(`Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`);
  client.user.setPresence({ game: { name: 'comando', type: 1, url: 'https://www.twitch.tv/pedroricardo' } });
  //0 = Jogando
  //  1 = Transmitindo
  //  2 = Ouvindo
  //  3 = Assistindo
});

client.on("message", async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  if (!message.content.startsWith(config.prefix)) return;

  const args = message.content.slice(config.prefix.length).trim().split(" ");
  const comando = args.shift().toLowerCase();

  // comando ping
  if (comando === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! A Latência é ${m.createdTimestamp - message.createdTimestamp}ms. A Latencia da API é ${Math.round(client.ping)}ms`);
  }

  // coamdno pega dados
  if (comando === "status") {
    const m = await message.channel.send("Aguarde!");
    //m.edit(args); 


      var plataforma = args[0]
      var userName = args[1]

      function trim(str) {

        // Use trim() function para mudar o simbolo # pelo % 
        var trimContent = str.trim()
        var newstr = str.replace('#', '%23')
        userName = newstr
      }

      // declarando a variable que irá mudar
      var str = userName

      // Function call 
      trim(str)

      if (plataforma == 'pc') {
        plataforma = 'atvi'
      }

      if (plataforma == 'xbox') {
        plataforma = 'atvi'
      }

      if (plataforma == 'psn') {
        plataforma = 'atvi'
      }

      m.edit("Esse processo pode demorar alguns segundos, se acaso parar aqui, contate o administrador!")

      request(`https://api.tracker.gg/api/v2/warzone/standard/profile/${plataforma}/${userName}`, function (error, response, body) {
        console.error('error:', error); // Exibe os possíveis erros
        console.log('statusCode:', response && response.statusCode); // imprima o código de status da resposta se uma resposta foi recebida

        // salva o arquivo recebido pelo request na pasta dados
        fs.writeFile("C://Users//Jonata Santos//Desktop//Arquivos//Bot Cod//dados//arquivodo" + userName + ".json", body, function (erro) {
          if (erro) {
            throw erro;
          }
        });

        console.log(typeof body)
        var jsonData = JSON.parse(body)

        if (jsonData.data) {
          var tKills = jsonData.data.segments[0].stats.kills.value
          var tRatio = jsonData.data.segments[0].stats.kdRatio.displayValue
          var tLevel = jsonData.data.segments[0].stats.level.value
          var tWins = jsonData.data.segments[0].stats.wins.value
          var tPlayed = jsonData.data.segments[0].stats.gamesPlayed.value

          var bKills = jsonData.data.segments[1].stats.kills.value
          var bRatio = jsonData.data.segments[1].stats.kdRatio.displayValue
          var bWins = jsonData.data.segments[1].stats.wins.value
          var bPlayed = jsonData.data.segments[1].stats.gamesPlayed.value

          var pKills = jsonData.data.segments[2].stats.kills.value
          var pRatio = jsonData.data.segments[2].stats.kdRatio.displayValue
          var pWins = jsonData.data.segments[2].stats.wins.value
          var pPlayed = jsonData.data.segments[2].stats.gamesPlayed.value

          m.edit("Ok, aqui está seu resumo: ")
          message.channel.send("\n VISÃO GERAL" + "```fix" + `\n ******Level: ${tLevel} \n ******Kills: ${tKills} \n ******K/D ratio: ${tRatio} \n ******Vitórias: ${tWins} \n ******Total de Partidas: ${tPlayed} \n` + "```")
          message.channel.send("\n MODO BATTLE ROYALE" + "```css" + `\n ******Kills: ${bKills} \n ******K/D ratio: ${bRatio} \n ******Vitorias: ${bWins} \n ******Partidas em battle Royale: ${bPlayed} \n` + "```")
          message.channel.send("\n MODO SAQUE/PLUNDER" + "```css" + `\n ******Kills: ${pKills} \n ******K/D ratio: ${pRatio} \n ******Vitorias: ${pWins} \n ******Partidas em battle Royale: ${pPlayed} \n` + "```")
        }
        if (jsonData.errors) {
          m.edit("Erro desconhecido")
        }        
        
      });        

  }

});

client.login(config.token);