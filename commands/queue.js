const ytdl = require('ytdl-core')
module.exports = {
  name: 'queue',
  descriptions: 'Show the queue',
  async execute(message, args){
    const queue = new Map()
    const severQueue = queue.get(message.guild.id)
    const voiceChannel = message.member.voice.channel
    const songInfo = await ytdl.getInfo(args[0])
    const song = {
        title: songInfo.title,
        url: songInfo.video_url
    }
    if(!severQueue)
      {
        const queueConstruct ={
          textChannel: message.channel,
          voiceChnnel : voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true
        }
        queue.set(message.guild.id, queueConstruct)
      }
    else
    {
      return
    }
  }
}
