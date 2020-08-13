require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
// const qp = require('./commands/queueprocess.js')

const client = new Discord.Client()
const prefix = '-'
const queueObj = []
const CommandObj = {
  'ping': 'ping',
  'p': 'play',
  'leave': 'leave',
  'q': 'queue'
}

const queue = [];
let isPlaying = false;

const onSongEnd = () => {
  queue.shift();
  isPlaying = false;
  if (queue.length) {
    onSongStart();
  }
}

const onSongStart = () => {
  client.commands.get('play').execute(queue[0].message,queue[0].args, async () => {
    isPlaying = true;
    const info = await ytdl.getBasicInfo(queue[0].args[0])
    let contentEmbedded = new Discord.MessageEmbed();
    contentEmbedded.setTitle('Now Playing')
    contentEmbedded.setDescription(`[${info.videoDetails.title}](${queue[0].args[0]})`);
    queue[0].message.channel.send(contentEmbedded);
  }, () => {
    onSongEnd();
  });
}

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
const command = require(`./commands/${file}`)
client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Im ready')
})

client.on('message', async message => {
  if(!message.content.startsWith(prefix) || message.author.bot) return
  if (message.content.startsWith(prefix)) {
    queueObj.push(message.content)
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()    

    // if (command === 'p')
    //   await client.commands.get(CommandObj[command]).execute(message,args, (url) => {
    //     queue.push(url);
    //   }, () => {
    //     queue.shift();
    //   }, ()=>{
    //     queue.push(args[0])
    //   })
    // else 
    //   await client.commands.get(CommandObj[command]).execute(message,args)
    if (command === 'p') {

      queue.push({message, args});
      if (!isPlaying) {
        onSongStart();
      } else {
        const info = await ytdl.getBasicInfo(args[0])
        let contentEmbedded = new Discord.MessageEmbed();
        contentEmbedded.setDescription(`Queued [${info.videoDetails.title}](${args[0]})`);
        message.channel.send(contentEmbedded);
      }
    }
    else 
      await client.commands.get(CommandObj[command]).execute(message,args)
  }
})

client.login(process.env.DISCORD_BOT_TOKEN)