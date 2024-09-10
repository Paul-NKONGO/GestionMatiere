const Division = require("../models/DivisionSchema");

module.exports.createDivision = async (req, res, next) => {
    try {
        const {acronym, ...data} = req.body
        const existingDivision  = await Division.findOne({ acronym: acronym });
        if(existingDivision){
            return res.status(400).json({ message: 'Division already exists' });
        }

        const division = new Division({ acronym: acronym, ...data });

        //const division = new Division(req.body);
        await division.save();

        res.status(201).send(division);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.getDivision = async (req, res, next) => {
    try {
        const division = await Division.find();
        res.status(201).send(division);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.updateDivision = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id) {
          return res.status(400).json({ message: 'Division ID is required' });
      }
      const updatedDivision = await Division.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedDivision) {
          return res.status(404).json({ message: 'Division not found' });
      }
      res.status(200).json(updatedDivision);
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports.deleteDivision = async (req, res, next) => {
  try {
      const id_division = req.params.userId
      const division = await Division.deleteOne({ _id: id_division });
      if(!division){
          return res.status(404).json({ message: 'Division not found' });
      }
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
};