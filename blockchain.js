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

  isValid(chain) {
    if (JSON.stringify(chain[0] !== JSON.stringify(Block.genesisBlock()))) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];
      if (block.lastHash !== lastBlock.hash) {
        return false;
      }
    }
    return true;
  }

  replace(newChain) {
    if (newChain <= this.chain.length) {
      console.log("New chain must be loger than current change");
      return;
    }
    if (!this.isValid(newChain)) {
      console.log("New chain in valid");
      return;
    }
    console.log('Replace new chain')
    this.chain = newChain;
  }
}

module.exports = BlockChain;
