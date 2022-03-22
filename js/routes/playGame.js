const MetaTris = require("../models/MetaTris");
const express = require("express");
const router = express.Router();
let game = null;
// 0: left,
// 1: right,
// 2: hard_drop,
// 3: soft_drop,
// 4: rotate_left,
// 5: rotate_right,
// 6: idle,
router.get("/play", (req, res) => {
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
});

router.get("/left", (req, res) => {
  game.play(0);
  res.send(
    game
      .drawBoard()
      .split("\n")
      .map((e) => `<p>${e}</p>`)
  );
});

router.get("/right", (req, res) => {
  game.play(1);
  res.send(
    game
      .drawBoard()
      .split("\n")
      .map((e) => `<p>${e}</p>`)
  );
});

router.get("/hardDrop", (req, res) => {
  game.play(2);
  res.send(
    game
      .drawBoard()
      .split("\n")
      .map((e) => `<p>${e}</p>`)
  );
});

router.get("/rotateLeft", (req, res) => {
  game.play(4);
  res.send(
    game
      .drawBoard()
      .split("\n")
      .map((e) => `<p>${e}</p>`)
  );
});

router.get("/rotateRight", (req, res) => {
  game.play(5);
  res.send(
    game
      .drawBoard()
      .split("\n")
      .map((e) => `<p>${e}</p>`)
  );
});
module.exports = router;
