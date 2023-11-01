const { message, user } = require("../models/db");

exports.postMessage = async (req, res) => {
  try {
    const groupId = +req.query.group;
    const text = req.body.message;
    const userId = req.user.id;
    const response = await message.create({ text, userId , groupId });
    return res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const offset = +req.query.offset;
    const groupId = +req.query.group;
    const response = await message.findAll({
      where:{groupId},
      include: [{ model: user, attributes: ["name"] }],
      attributes: ["id", "text", "createdAt"],
      order: [["id", "ASC"]],
    });
  
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
