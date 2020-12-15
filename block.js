const SHA256 = require("crypto-js/sha256");
// const DIFFICULTY = 4;
const BLOCK_TIME = 5000;

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.nonce = nonce;
    this.difficulty = difficulty;
    this.data = data;
  }

  static genesisBlock() {
    return new Block("genesis-time", "", "genesis-hash", "", 0, 2);
  }

  toString() {
    return `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      timestamp     : ${this.timestamp}
      lastHash      : ${this.lastHash}
      hash          : ${this.hash}
      data          : ${this.data}
      difficulty    : ${this.difficulty}
      nonce         : ${this.nonce}
      `;
  }

  static mineBlock(lastBlock, data) {
    let nonce = 0;
    let timeStamp;
    let hash;
    let difficulty;
    do {
      timeStamp = Date.now();
      nonce++;
      difficulty = Block.adjustDifficulty(lastBlock, timeStamp);
      hash = SHA256(
        `${timeStamp}${lastBlock.hash}${data}${nonce}${difficulty}`
      ).toString();
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    console.log("nonce", nonce);
    return new this(
      timeStamp,
      lastBlock.lastHash,
      hash,
      data,
      nonce,
      difficulty
    );
  }

  static adjustDifficulty(lastBlock, timeStamp) {
    return (lastBlock.timestamp + BLOCK_TIME) > timeStamp ? (lastBlock.difficulty + 1) : (lastBlock.difficulty - 1)
  }
}

module.exports = Block;
