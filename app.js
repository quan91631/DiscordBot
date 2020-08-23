require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')
const pause = require('./commands/pause')
// const qp = require('./commands/queueprocess.js')

const client = new Discord.Client()
const prefix = '-'
const CommandObj = {
  'ping': 'ping',
  'p': 'play',
  'leave': 'leave',
  'q': 'queue',
  'pause': 'pause',
  'resume':'resume'
}
const ownerID = process.env.OWNERID
const discordBotID = process.env.DISCORD_BOT_ID
const guildID = process.env.SEVER_ID

let timer 
let theVoiceChannel

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
    theVoiceChannel = message.member.voice.channel
    // SPLIT THE MESSAGE 
    const args = message.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()    
    let ops ={
      ownerID:ownerID
    }
    // QUEUE PROCESS USING RECURSIVE UNTIL FIRGUE OUT THE BETTER WAY TO DO THIS :) 
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

// SET LEAVE TIMER WHEN YOU LEAVE THE CHANNEL 
 client.on('voiceStateUpdate',(oldState, newState) =>{
  let before = oldState.channel
  let after = newState.channel
  console.log(after);
  if(before && !after)
  {
    // console.log('Setting leaving time from the channel')
    timer = setTimeout(() =>{
      theVoiceChannel.leave()

    },900000)
  }
  else if(after)
  { 
    clearTimeout(timer)
  }
})
  

client.login(process.env.DISCORD_BOT_TOKEN)