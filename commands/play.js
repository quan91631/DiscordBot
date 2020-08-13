const ytdl = require('ytdl-core')
const opuss = require('opusscript')
// const AQueue = require('./queueprocess')
module.exports = {
  name: 'play',
  descirption: 'Play the following link',
  async execute(message,args, callback, callbackEnd) {
    const voiceChannel = message.member.voice.channel
    let url = args[0]
    // SIMPLE CHECK

    if (!voiceChannel) return message.channel.send('Please join the voice Channel')
    if (message.guild.member.voiceChannel) return message.channel.send('You just not in the same sever')
    if (!args[0]) return message.channel.send('Input the video URL')
    // START PLAYING THE URL
    const info = await ytdl.getBasicInfo(url);
    // console.log(info);
    if (callback) {
      callback(info.videoDetails.video_url);
    }

    const connection = await message.member.voice.channel.join()
    const dispatcher = connection.play(ytdl(args[0]))
      .on('start', () => {
        // message.channel.send(`Playing [${info.videoDetails.title}](${info.videoDetails.video_url})`)
      })
      .on('speaking' , (flag) => {
        if (callbackEnd && !flag) {
          callbackEnd();
        }
      })
      .on('error' , () => {
        console.error(error);
      })
      
    dispatcher.setVolumeLogarithmic(5 / 5)
  }
}
