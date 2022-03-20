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
class Piece {
  constructor(genuineAnchor) {
    this.genuineAnchor = genuineAnchor;
    this.shape = null;
    this.anchor = null;
    this.tetrominoes= 1 ;
    this.newShape();
  }

  newShape() {
    const shape = shapeNames[Math.floor(Math.random() * shapeNames.length)];
    this.shape = shapes[shape];
    this.anchor = [...this.genuineAnchor];
    this.tetrominoes+=1
  }

  rotate(cclk = false) {
    if (cclk) {
      return this.shape.map(([i, j]) => [-j, i]);
    } else {
      return this.shape.map(([i, j]) => [j, -i]);
    }
  }

  
}
module.exports = Piece;
