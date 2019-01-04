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

const commands = [
    'command', 
    'battery?', 
    'takeoff', 
    'flip b', 
    'cw 90',
    'flip l', 
    'cw 90',
    'flip f', 
    'cw 90', 
    'flip r',
    'cw 90', 
    'land',
]

let i = 0
const go = async () => {
    const command = commands[i]
    const cmdRoot = command.split(' ')
    const delay = commandDelays[cmdRoot[0]]

    console.log(`running command: ${command}`)
    drone.send(command, 0, command.length, PORT, HOST, handleError)
    await wait(delay)
    i += 1
    if (i < commands.length) {
        return go()
    }
    console.log('Done!')
}

go()
