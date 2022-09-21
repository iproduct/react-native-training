let clients = [];

const notifyClients = (msg, data) =>
    clients.forEach(socket => socket.emit(msg, data));

module.exports = (io) => {
    io.on('connection', function (socket) {
        console.log('a user connected');
        clients.push(socket);

        socket.on('disconnect', () => {
            console.log('a user socket diconnected');
            clients = clients.filter((s) => s.id = socket.id);
        });
    });

    return {
        notifyClients,
    };
};
