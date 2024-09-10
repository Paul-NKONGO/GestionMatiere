const User = require("../models/UserSchema");
const Division = require("../models/DivisionSchema");

module.exports.createUser = async (req, res, next) => {
    try {
        //console.log(req.body)

        const {divisionId,...data} = req.body
        const division = await Division.findOne({ acronym: divisionId });
     
        const user = new User({ 
          divisionId: division._id, 
          ...data 
        });
        await user.save();
        
        res.status(201).send(user);
      } catch (error) {
        res.status(400).send(error);
      }
};

module.exports.getUser = async (req, res, next) => {
  try {
      const user = await User.find();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
};

module.exports.updateUser = async (req, res, next) => {
  try {
      const { id } = req.params;
      const updateData = req.body;
      if (!id) {
          return res.status(400).json({ message: 'User ID is required' });
      }
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(400).send(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
    try {
        const id_user = req.params.userId
        const user = await User.deleteOne({ _id: id_user });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).send(user);
      } catch (error) {
        res.status(400).send(error);
      }
};
