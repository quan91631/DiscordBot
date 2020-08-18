const {resumeTheSong} = require('./play')
module.exports = {
    name: 'resume',
    description:'Continue play the current song',
    async execute(message, args){
       resumeTheSong()
    }
}