import * as ioClient from 'socket.io-client';

export async function wsConnect() {
    const resp = await fetch('http://localhost:3000');
    console.log(resp);
    const socket = ioClient.connect("http://localhost:3000");
    return new Promise((resolve, reject) => {
        socket.on('connect', () => {
            socket.emit('messages');
            resolve({socket})
        })
        socket.on('connect_error', err => {
            console.log(`WS connection failed:`, err);
            reject(new Error(`ws:connection_failed: ${err}`))
        })
    }).catch(error => ({socket, error}))
}


