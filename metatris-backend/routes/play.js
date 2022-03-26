const gamesControllers = require("../controllers/gamesControllers");

const express = require("express");
const router = express.Router();

router.post("/playGame",gamesControllers.play );

router.put("/playGame",gamesControllers.execAction );


module.exports = router;
