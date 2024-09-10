
const router = require("express").Router();
const { createDivision, getDivision, updateDivision, deleteDivision } = require("../controllers/DivisionController");

router.post("/create-division", createDivision);
router.get("/", getDivision);
router.put("/update-division/:id", updateDivision);
router.delete("/delete-division/:disisionId", deleteDivision);

module.exports = router;