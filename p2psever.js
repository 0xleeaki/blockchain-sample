const WebSocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];

class P2pSever {
  constructor(blockchain) {
    this.blockchain = blockchain
    this.sockets = [];
  }

  listen() {
    const sever = new WebSocket.Server({
      port: P2P_PORT,
    });
    sever.on("connection", (socket) => {
      this.connectSocket(socket);
    });
    this.connectPeers();
    console.log(`listening on pep on: ${P2P_PORT}`);
  }

  connectPeers() {
    peers.forEach((peer) => {
      const socket = new WebSocket(peer);
      socket.on('open', () => {
        this.connectSocket(socket);
      });
    });
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    console.log("Socket connected");
    this.messageHandle(socket);
    this.sentChain(socket);
  }

  messageHandle(socket) {
    socket.on('message', (message) => {
      const receivingChain = JSON.parse(message)
      console.log('receivingChain', receivingChain)
      this.blockchain.replace(receivingChain)
      console.log(message);
    });
  }

  sentChain(socket) {
    socket.send(JSON.stringify(this.blockchain.chain));
  }
}

module.exports = P2pSever;
