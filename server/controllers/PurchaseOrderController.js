const PurchaseOrder = require("../models/PurchaseOrderSchema");
const Delivery = require("../models/DeliverySchema");

module.exports.createPurchaseOrder = async (req, res, next) => {
    try {
      const {ordernumber_delivery,...data} = req.body
      const delivery = await Delivery.findOne({ orderNumber: ordernumber_delivery });
      if(!delivery){
          return res.status(404).json({ message: 'Delivery not found' });
      }
      const purchaseorder = new PurchaseOrder({
          delivery:delivery._id,
          ...data
      });
        await purchaseorder.save();
        res.status(201).send(purchaseorder);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.getPurchaseOrder = async (req, res, next) => {
    try {
        const purchase_order = await PurchaseOrder.find();
        res.status(201).send(purchase_order);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.updatePurchaseOrder = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id) {
          return res.status(400).json({ message: 'Purchase order ID is required' });
      }
      const updatedPurchaseOrder = await PurchaseOrder.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedPurchaseOrder) {
          return res.status(404).json({ message: 'Purchase order not found' });
      }
      res.status(200).json(updatedPurchaseOrder);
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports.deletePurchaseOrder = async (req, res, next) => {
  try {
      const id_purchaseorder = req.params.purchaseorderId
      const purchaseorder = await PurchaseOrder.deleteOne({ _id: id_purchaseorder });
      if(!purchaseorder){
          return res.status(404).json({ message: 'Purchase order not found' });
      }
      res.status(201).send(purchaseorder);
    } catch (error) {
      res.status(400).send(error);
    }
};
