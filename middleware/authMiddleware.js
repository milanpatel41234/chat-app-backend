const jwt = require("jsonwebtoken");
const { user } = require("../database/db");

module.exports = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) throw new Error("Invalid token");
    const { userId } = jwt.verify(token, process.env.JWT_KEY);
    const foundUser = await user.findByPk(userId);
    if (foundUser) {
      req.user = foundUser;
      next();
    } else {
      throw new Error("Invalid token");
    }
  } catch (error) {
    res.status(405).send({ success: false, message: error});
  }
};
