const WebSocket = require("ws");

const port = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port });

wss.on("connection", ws => {

    console.log("Spieler verbunden");

    ws.on("message", message => {

        console.log(message.toString());

        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});

console.log("Server läuft auf Port", port);