
const router = require("express").Router();
const { createMaterial, getMaterial, updateMaterial, deleteMaterial } = require("../controllers/MaterialController");

router.post("/create-material", createMaterial);
router.get("/", getMaterial);
router.put("/update-material/:id", updateMaterial);
router.delete("/delete-material/:materialId", deleteMaterial);

module.exports = router;