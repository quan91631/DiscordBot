const ytdl = require('ytdl-core')
const opuss = require('opusscript')
// const AQueue = require('./queueprocess')
let dispatcher
let voiceChannel
let timer
module.exports = {
  name: 'play',
  descirption: 'Play the following link',
  async execute(message,args) {
    voiceChannel = message.member.voice.channel
    let url = args[0]
    // SIMPLE CHECK

    if (!voiceChannel) return message.channel.send('Please join the voice Channel')
    if (message.guild.member.voiceChannel) return message.channel.send('You just not in the same sever')
    if (!args[0]) return message.channel.send('Input the video URL')
    // START PLAYING THE URL
    const info = await ytdl.getBasicInfo(url);
    // console.log(info);
    
    const connection = await message.member.voice.channel.join()
    dispatcher = connection.play(ytdl(url,{filter: "audioonly"}))
      .on('start', () => {
        // message.channel.send(`Playing [${info.videoDetails.title}](${info.videoDetails.video_url})`)
      })
      .on('speaking' , () => {
        // if(flag === 0)
        //   setTimeout(() =>{
        //     voiceChannel.leave()
        //   },900000) 
      })
      .on('error' , () => {
        console.error(error);
      })
      
    dispatcher.setVolumeLogarithmic(5 / 5)
    },
  pauseTheSong(){
    //pause the song 
    dispatcher.pause()
    timer = setTimeout(() => {
      voiceChannel.leave()
    },10000)
  },
  resumeTheSong() {
    //resume the song here
    dispatcher.resume()
    clearTimeout(timer)
  }
}
