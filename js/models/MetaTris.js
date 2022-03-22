const Board = require("./Board");
const engine = require("../utils/pieceUtils");

class MetaTris {
  constructor(width = 10, height = 20, speed= 1000) {
    this.board = new Board(width, height);
    this.anchor = null;
    this.piece = null;
    this.tetrominos = 0;
    this.speed = speed; 
    this.score = 0;
    this.done=false ;
    this.valueActionMap = {
      0: engine.left,
      1: engine.right,
      2: engine.hardDrop,
      3: engine.softDrop,
      4: engine.rotateLeft,
      5: engine.rotateRight,
      6: engine.idle,
    };
    this.newPiece();
  }
  newPiece() {
    this.tetrominos += 1;
    this.anchor = [Math.floor(this.board.width / 2), 0];
    this.piece = engine.newPiece();
    [this.piece, this.anchor] = engine.softDrop(
      this.piece,
      this.anchor,
      this.board
    );
  }

  hasDropped() {
    return engine.isOccupied(
      this.piece,
      [this.anchor[0], this.anchor[1] + 1],
      this.board
    );
  }

  clearLines() {
    const clearedLines = this.board.clearedLines();
    const newBoard = this.board.zerosLike();
    let j = this.board.height - 1;
    for (let i = j; i >= 0; i--) {
      if (!clearedLines[i]) {
        newBoard.setColumn(j, this.board.getColumn(i));
        j--;
      }
    }

    this.board = newBoard;
    this.score += clearedLines.reduce((a, b) => a + b);
  }

  execAction(action) {
    [this.piece, this.anchor] = this.valueActionMap[action](
      this.piece,
      this.anchor,
      this.board
    );
  }

  play(action) {
    this.execAction(action);

    if (this.hasDropped()) {
      this.board.setPiece(this.piece, this.anchor, 1);

      this.clearLines();

      if (this.board.isBoardOverFlow()) {
        this.done = true;
      } else {
        this.newPiece();
      }

      this.board.setPiece(this.piece, this.anchor, 0);
    }

  }

  kill() { 
    clearInterval(this.timer)
  }
  run() {

    this.timer = setInterval(()=>{
      this.play(3);
      this.board.drawBoard(this.piece, this.anchor);
      if (this.done){
        clearInterval(this.timer)
      }
    },this.speed); 

    this.board.drawBoard(this.piece, this.anchor);
    
     
  }

  drawBoard(){
    return this.board.drawBoard(this.piece, this.anchor); 
  }
}

// const p = new MetaTris();
// p.run();

module.exports = MetaTris