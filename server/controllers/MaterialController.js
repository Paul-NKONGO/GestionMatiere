const Material = require("../models/MaterialSchema");

module.exports.createMaterial = async (req, res, next) => {
    try {
        const material = new Material(req.body);
        await material.save();
        res.status(201).send(material);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.getMaterial = async (req, res, next) => {
    try {
        const material = await Material.find();
        res.status(201).send(material);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.updateMaterial = async (req, res, next) => {
  try {
      // Extraire l'ID du matériau et les données de mise à jour de la requête
      const { id } = req.params;
      const updateData = req.body;

      // Valider que l'ID du matériau est fourni
      if (!id) {
          return res.status(400).json({ message: 'Material ID is required' });
      }

      // Mettre à jour le matériau
      const updatedMaterial = await Material.findByIdAndUpdate(id, updateData, { new: true });

      // Vérifier si le matériau a été trouvé et mis à jour
      if (!updatedMaterial) {
          return res.status(404).json({ message: 'Material not found' });
      }

      // Répondre avec le matériau mis à jour
      res.status(200).json(updatedMaterial);
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports.deleteMaterial = async (req, res, next) => {
  try {
      const id_material = req.params.materialId
      const material = await Material.deleteOne({ _id: id_material });
      if(!material){
          return res.status(404).json({ message: 'material not found' });
      }
      res.status(201).send(material);
    } catch (error) {
      res.status(400).send(error);
    }
};
