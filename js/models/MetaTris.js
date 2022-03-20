const Board = require("./Board");
const engine = require("../utils/pieceUtils");
const prompt = require("prompt-sync")({ sigint: true });

class MetaTris {
  constructor(width = 10, height = 20) {
    this.board = new Board(width, height);
    this.anchor = null;
    this.piece = null;
    this.tetrominos = 0;
    this.score = 0;
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

  play() {
    let done = false;
    const action = parseInt(prompt("Enter the action: \n"));
    this.execAction(action);

    if (this.hasDropped()) {
      this.board.setPiece(this.piece, this.anchor, 1);

      this.clearLines();

      if (this.board.isBoardOverFlow()) {
        done = true;
      } else {
        this.newPiece();
      }

      this.board.setPiece(this.piece, this.anchor, 0);
    }

    this.execAction(3);
    return done;
  }
  run() {
    let done = false;
    this.board.drawBoard(this.piece, this.anchor);
    while (!done) {
      done = this.play();
      this.board.drawBoard(this.piece, this.anchor);
    }
  }
}

const p = new MetaTris();
p.run();
