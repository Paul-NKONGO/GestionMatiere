
const router = require("express").Router();
const { createUser, getUser, updateUser, deleteUser } = require("../controllers/UserController");

router.post("/create-user", createUser);
router.get("/", getUser);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:userId", deleteUser);

module.exports = router;