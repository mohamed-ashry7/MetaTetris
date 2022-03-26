const MetaTris = require("../models/MetaTris");
let game = null;

exports.play = (req, res) => {
  if (game) {
    game.kill();
  }

  game = new MetaTris();
  game.run();
  res.send(
    {
      mBoard: game.drawBoard(),
      score: game.score,
      gameOver: game.done,
    }
  );
};

exports.execAction = (req, res) => {
  if (game){
  game.play(req.body.action);
  res.send(
    {
      mBoard: game.drawBoard(),
      score: game.score,
      gameOver: game.done,
    }
  );
  }
};
