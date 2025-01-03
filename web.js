const WebSocket = require('ws');
const zmq = require('zeromq');

const wss = new WebSocket.Server({ port: 8786 });
const subSock = new zmq.Subscriber();

subSock.connect('tcp://127.0.0.1:5555');
subSock.subscribe('');

function broadcastToClients(data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            try {
                client.send(JSON.stringify(data));
            } catch (error) {
                console.error("Error broadcasting to client:", error);
            }
        }
    });
}

(async () => {
    for await (const message of subSock) {
        const msgString = message.toString();
        
        if (msgString.startsWith("camera1 ")) {
            const frame1 = msgString.replace("camera1 ", "");
            console.log("Received Camera Frame");
            broadcastToClients({ type: "camera1", value: frame1 });
        }

        if (msgString.startsWith("camera2 ")) {
            const frame2 = msgString.replace("camera2 ", "");
            console.log("Received Camera Frame");
            broadcastToClients({ type: "camera2", value: frame2 });
        }

        if (msgString.startsWith("camera3 ")) {
            const frame3 = msgString.replace("camera3 ", "");
            console.log("Received Camera Frame");
            broadcastToClients({ type: "camera3", value: frame3 });
        }
        if (msgString.startsWith("camera4 ")) {
            const frame4 = msgString.replace("camera4 ", "");
            console.log("Received Camera Frame");
            broadcastToClients({ type: "camera4", value: frame4 });
        }

        
        if (msgString.startsWith("sensor1 ")) {
            const sensor1 = msgString.replace("sensor1 ", "");
            console.log(`Received Sensor 1: ${sensor1}`);
            broadcastToClients({ type: "sensor1", value: sensor1 });
        }


        if (msgString.startsWith("sensor2 ")) {
            const sensor2 = msgString.replace("sensor2 ", "");
            console.log(`Received Sensor 2: ${sensor2}`);
            broadcastToClients({ type: "sensor2", value: sensor2 });
        }


        if (msgString.startsWith("sensor3 ")) {
            const sensor3 = msgString.replace("sensor3 ", "");
            console.log(`Received Sensor 3: ${sensor3}`);
            broadcastToClients({ type: "sensor3", value: sensor3 });
        }


        if (msgString.startsWith("sensor4 ")) {
            const sensor4 = msgString.replace("sensor4 ", "");
            console.log(`Received Sensor 4: ${sensor4}`);
            broadcastToClients({ type: "sensor4", value: sensor4 });
        }


        if (msgString.startsWith("sensor5 ")) {
            const sensor5 = msgString.replace("sensor5 ", "");
            console.log(`Received Sensor 5: ${sensor5}`);
            broadcastToClients({ type: "sensor5", value: sensor5 });
        }


        if (msgString.startsWith("spectroscopy ")) {
            const spectroscopy = msgString.replace("spectroscopy ", "");
            console.log(`Received Spectroscopy:`);
            broadcastToClients({ type: "spectroscopy", value: spectroscopy });
        }
    }
})();

wss.on('connection', (ws) => {
    console.log("New WebSocket client connected");


    ws.on('close', () => {
        console.log("WebSocket client disconnected");
    });
});

process.on('SIGINT', async () => {
    console.log("Shutting down...");
    await subSock.close();
    wss.close();
    process.exit(0);
});

