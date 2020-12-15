const BlockChain = require("./blockchain");

const bc = new BlockChain();
const newBlock = bc.addBlock("foo");
console.log(bc.toString());
