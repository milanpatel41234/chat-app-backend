const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const db = require("./models/db");
const authRouter = require("./routes/authRoutes");
const messageRouter = require("./routes/messageRoutes");
const groupRouter = require("./routes/groupRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { user, message, group } = db;
user.hasMany(message);
message.belongsTo(user);
group.hasMany(message);
message.belongsTo(group);

user.belongsToMany(group, { through: "UserGroups" });
group.belongsToMany(user, { through: "UserGroups" });

db.sequelize.sync();

app.use("/user", authRouter);
app.use("/message", authMiddleware, messageRouter);
app.use("/group", authMiddleware, groupRouter);

app.listen(5000);
