
const router = require("express").Router();
const { createBsp } = require("../controllers/BspController");

router.post("/create-bsp", createBsp);

module.exports = router;