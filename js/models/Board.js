class Board {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.board = Array(width)
        .fill()
        .map(() => Array(height).fill(0));
      this.shape = [width, height];
      this.board.shape;
    }
  
    clearedLines() {
      const arr = [];
      for (let j = 0; j < this.height; j++) {
        let flag = true;
        for (let i = 0; i < this.width; i++) {
          if (!this.board[i][j]) {
            flag = false;
          }
        }
        arr.push(flag);
      }
      return arr;
    }
    zerosLike() {
      return new Board(this.width, this.height);
    }
    getColumn(c) {
      return this.board.map((value) => value[c]);
    }
  
    setColumn(c, newCol) {
      for (let i = 0; i < this.width; i++) {
        this.board[i][c] = newCol[i];
      }
    }
  
    setPiece(piece, visible) {
      for (const [i, j] of piece.shape) {
        const [x, y] = [i + piece.anchor[0], j + piece.anchor[1]];
        if (x < this.width && x >= 0 && y < this.height && y >= 0) {
          this.board[x][y] = visible;
        }
      }
    }
  
    isBoardOverFlow() {
      return this.board.map((value) => value[0]).reduce((a, b) => a + b) > 0;
    }
  
    getTranspose(){
      return this.board[0].map((_, colIndex) => this.board.map((row) => row[colIndex]));
  
    }
  
    drawBoard(piece) { 
      this.setPiece(piece,1);
      const output = this.getTranspose();
      const line = "o"+Array(this.width).fill("-").join("")+"o\n" ; 
      let grid = line ;
      // console.log(line)
      output.forEach(row=>grid +="|"+row.map(val=>val==0?" ":"X").join("")+"|\n");
      grid += line ;
      console.log(grid);
      this.setPiece(piece,0);
      return grid;
  
    }
    getCoordinates(x,y){
        return this.board[x][y]
    }
  }
  
  module.exports = Board;
  