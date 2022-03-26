const Board = require("./Board");
const Piece = require("./Piece");

class MetaTris {
  constructor(width = 10, height = 20, speed = 1000) {
    this.board = new Board(width, height);
    this.tetrominos = 1;
    this.speed = speed;
    this.score = 0;
    this.done = false;
    this.piece = new Piece(this.board);
  }

  clearLines =()=> {
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

  execAction=(action)=> {
    if (action===0){
        this.piece.left();
    }
    else if (action===1){
        this.piece.right();
    }
    else if (action===2){
        this.piece.hardDrop();
    }
    else if (action===3){
        this.piece.softDrop();
    }
    else if (action===4){
        this.piece.rotateLeft();
    }
    else if (action===5){
        this.piece.rotateRight();
    }
  }

  play=(action)=> {
    this.execAction(action);

    if (this.piece.hasDropped()) {
      this.board.setPiece(this.piece, 1);

      this.clearLines();

      if (this.board.isBoardOverFlow()) {
        this.done = true;
      } else {
        this.piece = new Piece(this.board);
        this.tetrominos+=1;
      }

      this.board.setPiece(this.piece, 0);
    }
  }

  kill=()=> {
    clearInterval(this.timer);
  }
  run=()=> {
    this.timer = setInterval(() => {
      this.play(3);
      this.board.drawBoard(this.piece);
      if (this.done) {
        clearInterval(this.timer);
      }
    }, this.speed);

    this.board.drawBoard(this.piece);
  }

  drawBoard=()=> {
    return this.board.drawBoard(this.piece);
  }

}

// const p = new MetaTris();
// p.run();

module.exports = MetaTris;
