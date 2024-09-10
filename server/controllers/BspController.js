const Bsp = require("../models/BspSchema");

module.exports.createBsp = async (req, res, next) => {
    try {
        const bsp = new Bsp(req.body);
        await bsp.save();
        res.status(201).send(bsp);
      } catch (error) {
        res.status(400).send(error);
      }
};