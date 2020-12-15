const Block = require("./block");
class BlockChain {
  constructor() {
    this.chain = [Block.genesisBlock()];
  }

  addBlock(data) {
    const lashBlock = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(lashBlock, data);
    this.chain.push(block);
    return block;
  }

  toString() {
    return `${this.chain.map((c) => c.toString()).join("\n")} `;
  }
}

module.exports = BlockChain;
