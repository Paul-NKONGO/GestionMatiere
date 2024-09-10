const Delivery = require("../models/DeliverySchema");
const Provider = require('../models/ProviderSchema');
const Material = require('../models/MaterialSchema');
const { generatePurchaseOrder } = require('../utils/GeneratePurchaseOrder');


module.exports.createDelivery = async (req, res, next) => {
    try {
        const {taxnumber_provider, id_material, ...data} = req.body

        // Vérifier que le fournisseur existe
        const provider = await Provider.findOne({ taxNumber: taxnumber_provider });
        if(!provider){
            return res.status(404).json({ message: 'Provider not found' });
        }

        // Vérifier que les matériaux sont fournis sous forme d'objets 
        if (!Array.isArray(id_material) || id_material.length === 0) {
          return res.status(400).json({ message: 'Materials are required and must be an array' });
      }

        // Créer les matériaux dans la base de données
        const createdMaterials = await Material.insertMany(id_material);

        // Récupérer les IDs des matériaux créés
        const materialIds = createdMaterials.map(material => material._id);

        // Créer la livraison
        const delivery = new Delivery({
            providerId: provider._id,
            materialId: materialIds,
            ...data
        });

        await delivery.save();

        // Générer le bon de commande PDF
        const filePath = await generatePurchaseOrder(delivery, provider, createdMaterials);

        res.status(201).send({delivery, pdfPath: filePath});
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.getDelivery = async (req, res, next) => {
    try {
        const delivery = await Delivery.find();
        res.status(201).send(delivery);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.updateDelivery = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id) {
          return res.status(400).json({ message: 'Delivery ID is required' });
      }
      const updatedDelivery = await Delivery.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedDelivery) {
          return res.status(404).json({ message: 'Delivery not found' });
      }
      res.status(200).json(updatedDelivery);
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports.deleteDelivery = async (req, res, next) => {
  try {
      const id_delivery = req.params.deliveryId
      const delivery = await Delivery.deleteOne({ _id: id_delivery });
      if(!delivery){
          return res.status(404).json({ message: 'Delivery not found' });
      }
      res.status(201).send(delivery);
    } catch (error) {
      res.status(400).send(error);
    }
};

