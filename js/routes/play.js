const gamesControllers = require("../controllers/gamesControllers")
const express = require("express");
const router = express.Router();

router.get("/play",gamesControllers.play );

router.get("/left",gamesControllers.left );

router.get("/right",gamesControllers.right );

router.get("/hardDrop", gamesControllers.hardDrop);

router.get("/rotateLeft", gamesControllers.rotateLeft);

router.get("/rotateRight",gamesControllers.rotateRight);

module.exports = router;
