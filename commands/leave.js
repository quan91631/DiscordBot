module.exports = {
  name: "leave",
  descirption:"Leave the Voice Channel",
  execute (message,args){
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel) return message.channel.send('You need to be in the Voice Channel')
    message.member.voice.channel.leave()
    return
  }
}
