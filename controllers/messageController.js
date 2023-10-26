const { message, user } = require("../models/db");

exports.postMessage = async (req, res) => {
  try {
    const text = req.body.message;
    const userId = req.user.id;
    const response = await message.create({ text, userId });
    return res.send(response);
  } catch (error) {
    res.send(error);
  }
};

exports.getMessage = async (req, res) => {
  try {
    const response = await message.findAll({
      include: [{ model: user, attributes: ["name"] }],
      attributes: ["id", "text", "createdAt"],
      order: [["createdAt", "ASC"]],
    });
    res.send(response);
  } catch (error) {}
};
