
const router = require("express").Router();
const { createDelivery, getDelivery, updateDelivery, deleteDelivery } = require("../controllers/DeliveryController");

router.post("/create-delivery", createDelivery);
router.get("/", getDelivery);
router.put("/update-delivery/:id", updateDelivery);
router.delete("/delete-delivery/:deliveryId", deleteDelivery);

module.exports = router;