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

//drone.send('command', 0, 7, PORT, HOST, handleError )
//drone.send('battery?', 0, 8, PORT, HOST, handleError )

const commands = ['command', 'battery?', 'takeoff', 'land']
//const commands = ['command', 'land']    // for emergencies uncomment and run.`

let i = 0

const go = async () => {
    const command = commands[i]
    const delay = commandDelays[command]
    console.log(`running cmmand: ${command}`)
    drone.send(command, 0, command.length, PORT, HOST, handleError)
    await wait(delay)
    i += 1
    if (i < command.length) {
        return go()
    }
    console.log('Done!')
}

go( )

