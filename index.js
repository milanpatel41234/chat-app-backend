const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config()
const db = require('./database/db')
const authRouter = require('./routes/authRoutes');

const app = express();
app.use(cors());
app.use(express.json());
 db.sequelize.sync();

app.use('/user' , authRouter)

app.listen(5000)