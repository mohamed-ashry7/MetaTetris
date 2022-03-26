const shapes = {
  T: [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
  ],
  J: [
    [0, 0],
    [-1, 0],
    [0, -1],
    [0, -2],
  ],
  L: [
    [0, 0],
    [1, 0],
    [0, -1],
    [0, -2],
  ],
  Z: [
    [0, 0],
    [-1, 0],
    [0, -1],
    [1, -1],
  ],
  S: [
    [0, 0],
    [-1, -1],
    [0, -1],
    [1, 0],
  ],
  I: [
    [0, 0],
    [0, -1],
    [0, -2],
    [0, -3],
  ],
  O: [
    [0, 0],
    [0, -1],
    [-1, 0],
    [-1, -1],
  ],
};
const shapeNames = ["T", "J", "L", "Z", "S", "I", "O"];
const colors = {
  T: "P",
  J: "B",
  L: "O",
  Z: "R",
  S: "G",
  I: "C",
  O: "Y",
};
class Piece {
  constructor(board) {
    this.board = board;
    this.shape = null;
    this.anchor = null;
    const shape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
    this.color = colors[shape];
    this.shape = shapes[shape];
    this.anchor = [Math.floor(this.board.width / 2), 0];
    }


  hasDropped=()=> {
    return this.isOccupiedAnchor(
      [this.anchor[0], this.anchor[1] + 1],
    );
  }

  rotate=(cclk = false)=> {
    if (cclk) {
      return this.shape.map(([i, j]) => [-j, i]);
    } else {
      return this.shape.map(([i, j]) => [j, -i]);
    }
  }

  isOccupied=(shape, anchor)=> {
    for (const [i, j] of shape) {
      const [x, y] = [anchor[0] + i, anchor[1] + j];
      if (y < 0) {
        continue;
      }
      if (
        x < 0 ||
        x >= this.board.shape[0] ||
        y >= this.board.shape[1] ||
        this.board.getCoordinates(x, y)
      ) {
        return true;
      }
    }
    return false;
  }

  isOccupiedAnchor=(anchor)=> {
    return this.isOccupied(this.shape, anchor);
  }

  isOccupiedShape=(shape)=> {
    return this.isOccupied(shape, this.anchor);
  }

  left=()=> {
    const newAnchor = [this.anchor[0] - 1, this.anchor[1]];
    if (!this.isOccupiedAnchor(newAnchor)) {
      this.anchor = newAnchor;
    }
  }

  right=()=> {
    const newAnchor = [this.anchor[0] + 1, this.anchor[1]];
    if (!this.isOccupiedAnchor(newAnchor)) {
      this.anchor = newAnchor;
    }
  }

  softDrop=()=> {
    const newAnchor = [this.anchor[0], this.anchor[1] + 1];
    if (!this.isOccupiedAnchor(newAnchor)) {
      this.anchor = newAnchor;
      return true; 
    }
    return false;
  }

  hardDrop=()=> {
    let drop = true; 
    while (drop) {
      drop = this.softDrop(); 
    }
  }

  rotateLeft=()=> {
    const newShape = this.rotate(false);
    if (!this.isOccupiedShape(newShape)) {
      this.shape = newShape;
    }
  }

  rotateRight=()=> {
    const newShape = this.rotate(true);
    if (!this.isOccupiedShape(newShape)) {
      this.shape = newShape;
    }
  }

}
module.exports = Piece;
