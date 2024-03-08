
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/dbConfig');
require('dotenv').config();
const upload = require('express-fileupload');
const { authRouter } = require('./routes/auth/authentication');
const { recuriterRouter } = require('./routes/recruiter/recruiterRoute');



const app = express();


app.use(upload());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());

app.use('/auth', authRouter);
app.use('/recruiter', recuriterRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is listening at port : ${port}`);
  dbConnect();
});
