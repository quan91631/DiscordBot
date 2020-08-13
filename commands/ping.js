module.exports = {
  name: 'ping',
  descirption: 'Just a test message',
  execute(message,args){
    message.channel.send('Pong!!!')
  }
}
