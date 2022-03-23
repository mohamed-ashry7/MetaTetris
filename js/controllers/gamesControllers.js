
const MetaTris = require("../models/MetaTris");
let game = null;
// 0: left,
// 1: right,
// 2: hard_drop,
// 3: soft_drop,
// 4: rotate_left,
// 5: rotate_right,
// 6: idle,

exports.play = (req, res) => {
    if (game) {
      game.kill();
    }
    game = new MetaTris();
    game.run();
    res.send(
      game
        .drawBoard()
        .split("\n")
        .map((e) => `<p>${e}</p>`)
    );
  };

exports.left =(req, res) => {
    game.play(0);
    res.send(
      game
        .drawBoard()
        .split("\n")
        .map((e) => `<p>${e}</p>`)
    );
  };

exports.right = (req, res) => {
    game.play(1);
    res.send(
      game
        .drawBoard()
        .split("\n")
        .map((e) => `<p>${e}</p>`)
    );
  } ;

exports.hardDrop = (req, res) => {
    game.play(2);
    res.send(
      game
        .drawBoard()
        .split("\n")
        .map((e) => `<p>${e}</p>`)
    );
  };

exports.rotateLeft=(req, res) => {
    game.play(4);
    res.send(
      game
        .drawBoard()
        .split("\n")
        .map((e) => `<p>${e}</p>`)
    );
  };
exports.rotateRight = (req, res) => {
    game.play(5);
    res.send(
      game
        .drawBoard()
        .split("\n")
        .map((e) => `<p>${e}</p>`)
    );
  };