const express = require("express");
const bodyParser = require("body-parser");
const BlockChain = require("./blockchain");
const HTTP_POST = process.env.HTTP_POST || 3000;

const app = express();
app.use(bodyParser.json());
const bc = new BlockChain();

app.get("/blocks", (req, res) => {
  res.json(bc.chain);
});

app.post("/mine", (req, res) => {
  const data = req.body.data;
  const block = bc.addBlock(data);
  console.log(`New block added: ${block.toString()}`);
  res.redirect("/blocks");
});

app.listen(HTTP_POST, () => {
  console.log(`sever start at ${HTTP_POST}`);
});
