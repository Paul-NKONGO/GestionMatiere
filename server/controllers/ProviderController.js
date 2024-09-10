const Provider = require("../models/ProviderSchema");

module.exports.createProvider = async (req, res, next) => {
    try {
        const provider = new Provider(req.body);
        await provider.save();
        res.status(201).send(provider);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.getProvider = async (req, res, next) => {
    try {
        const provider = await Provider.find();
        res.status(201).send(provider);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.updateProvider = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id) {
          return res.status(400).json({ message: 'Provider ID is required' });
      }
      const updatedProvider = await Division.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProvider) {
          return res.status(404).json({ message: 'Provider not found' });
      }
      res.status(200).json(updatedProvider);
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports.deleteProvider = async (req, res, next) => {
  try {
      const id_provider = req.params.userId
      const provider = await Provider.deleteOne({ _id: id_provider });
      if(!provider){
          return res.status(404).json({ message: 'Provider not found' });
      }
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
};