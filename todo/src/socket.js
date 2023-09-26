import { WebSocketServer } from 'ws';
import { FileHandler } from './persist.js';
const standardWebSocketInstance = new WebSocketServer({ port: 90 });

export class SocketHandler {
    constructor(webSocketInstance = standardWebSocketInstance) {
        this.webSocket = webSocketInstance;

        this.connections = new Set();

        this.webSocket.on('connection', (socket) => {
            this.handleConnection(socket);
        });
    }

    handleConnection(socket) {
        this.connections.add(socket);

        socket.on('message', (message) => {
            this.handleMessage(socket, message);
        });

        socket.on('close', () => {
            this.connections.delete(socket);
        });
    }

    handleMessage(socket, message) {
        try {
            const data = JSON.parse(message);

            if (data.type === 'request') {
                this.handleDataRequest(socket, data);
            }
            else if (data.type === 'post') {
                this.handleDataPost(socket, data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    handleDataRequest(socket, data) {
        console.log('Requested load of file:', data);
        const userID = data.user;
        const fileHandler = new FileHandler(userID);
        const result = fileHandler.readFile();
        socket.send(result);
    }

    handleDataPost(socket, data) {
        console.log('Received data post:', data);
        const userID = data.user;
        const fileHandler = new FileHandler(userID);
        fileHandler.writeFile(JSON.stringify(data.data));
    }
}