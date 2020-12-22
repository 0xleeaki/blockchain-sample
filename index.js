const express = require("express");
const bodyParser = require("body-parser");
const BlockChain = require("./blockchain");
const P2pSever = require("./p2psever");
const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();
app.use(bodyParser.json());
const bc = new BlockChain();
const p2p = new P2pSever(bc)

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const data = req.body.data;
  const block = bc.addBlock(data);
  console.log(`New block added: ${block.toString()}`);
  res.redirect("/blocks");
});

app.listen(HTTP_PORT, () => {
  console.log(`sever start at ${HTTP_PORT}`);
});


p2p.listen()