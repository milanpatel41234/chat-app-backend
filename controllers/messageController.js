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
    const offset = +req.query.offset;
    const response = await message.findAll({
      include: [{ model: user, attributes: ["name"] }],
      attributes: ["id", "text", "createdAt"],
      order: [["id", "ASC"]],
      offset:offset,
    });
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
