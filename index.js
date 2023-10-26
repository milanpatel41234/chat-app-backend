const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const db = require('./models/db')
const authRouter = require('./routes/authRoutes');
const messageRouter = require('./routes/messageRoutes');
const authMiddleware = require('./middleware/authMiddleware');


const app = express();
app.use(cors());
app.use(express.json());

const {user , message} = db;
user.hasMany(message)
message.belongsTo(user);

db.sequelize.sync();

app.use('/user' , authRouter);
app.use('/message', authMiddleware, messageRouter)

app.listen(5000)