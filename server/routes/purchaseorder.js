
const router = require("express").Router();
const { createPurchaseOrder, getPurchaseOrder, updatePurchaseOrder, deletePurchaseOrder } = require("../controllers/PurchaseOrderController");

router.post("/create-purchaseorder", createPurchaseOrder);
router.get("/", getPurchaseOrder);
router.put("/update-purchaseorder/:id", updatePurchaseOrder);
router.delete("/delete-purchareorder/:purchaseorderId", deletePurchaseOrder);


module.exports = router;