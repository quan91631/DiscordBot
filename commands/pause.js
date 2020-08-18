const {pauseTheSong} = require('./play')
module.exports = {
    name: 'pause',
    description: "Pause the song",
    async execute (message,args){
        pauseTheSong()
    }
}