
const router = require("express").Router();
const { createProvider, getProvider, updateProvider, deleteProvider } = require("../controllers/ProviderController");

router.post("/create-provider", createProvider);
router.get("/", getProvider);
router.put("/update-provider/:id", updateProvider);
router.delete("/delete-provider/:providerId", deleteProvider);

module.exports = router;