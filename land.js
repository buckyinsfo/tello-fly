const dgram = require('dgram')
const wait = require('waait')
const commandDelays = require('./command-delays')

const PORT = 8889
const HOST = '192.168.10.1'

const drone = dgram.createSocket('udp4')
drone.bind(PORT)

drone.on('message', (message) => {
    console.log(`D : ${message}`)
})

const handleError = (err) => {
    if (err) {
        console.log('ERROR')
        console.log(err)
    }
}

drone.send('command', 0, 7, PORT, HOST, handleError )
drone.send('land', 0, 4, PORT, HOST, handleError )