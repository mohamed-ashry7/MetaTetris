const pieces = {
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
const pieceNames = ["T", "J", "L", "Z", "S", "I", "O"];

const newPiece = () => {
  const piece = pieceNames[Math.floor(Math.random() * pieceNames.length)];
  return pieces[piece];
};
const rotated = (piece, cclk = false) => {
  if (cclk) {
    return piece.map(([i, j]) => [-j, i]);
  } else {
    return piece.map(([i, j]) => [j, -i]);
  }
};

const isOccupied = (piece, anchor, board) => {
  for (const [i, j] of piece) {
    const [x, y] = [anchor[0] + i, anchor[1] + j];
    if (y < 0) {
      continue;
    }
    if (
      x < 0 ||
      x >= board.shape[0] ||
      y >= board.shape[1] ||
      board.getCoordinates(x, y)
    ) {
      return true;
    }
  }
  return false;
};

const left = (piece, anchor, board) => {
  const newAnchor = [anchor[0] - 1, anchor[1]];
  return isOccupied(piece, newAnchor, board)
    ? [piece, anchor]
    : [piece, newAnchor];
};

const right = (piece, anchor, board) => {
  const newAnchor = [anchor[0] + 1, anchor[1]];
  return isOccupied(piece, newAnchor, board)
    ? [piece, anchor]
    : [piece, newAnchor];
};

const softDrop = (piece, anchor, board) => {
  const newAnchor = [anchor[0], anchor[1] + 1];
  return isOccupied(piece, newAnchor, board)
    ? [piece, anchor]
    : [piece, newAnchor];
};

const hardDrop = (piece, anchor, board) => {
  while (true) {
    [_, newAnchor] = softDrop(piece, anchor, board);
    if (JSON.stringify(newAnchor) == JSON.stringify(anchor)) {
      return [piece, newAnchor];
    }
    anchor = newAnchor;
  }
};

const rotateLeft = (piece, anchor, board) => {
  const newPiece = rotated(piece, false);
  return isOccupied(newPiece, anchor, board)
    ? [piece, anchor]
    : [newPiece, anchor];
};

const rotateRight = (piece, anchor, board) => {
  const newPiece = rotated(piece, true);
  return isOccupied(newPiece, anchor, board)
    ? [piece, anchor]
    : [newPiece, anchor];
};

const idle = (piece, anchor) => {
  return [piece, anchor];
};

module.exports = {
  isOccupied,
  newPiece,
  rotated,
  rotateLeft,
  rotateRight,
  left,
  right,
  softDrop,
  hardDrop,
  idle,
};
