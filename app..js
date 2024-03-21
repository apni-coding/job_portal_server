
const express = require('express');
const cors = require('cors');
const { dbConnect } = require('./config/dbConfig');
require('dotenv').config();
const upload = require('express-fileupload');
const { authRouter } = require('./routes/auth/authentication');
const { recuriterRouter } = require('./routes/recruiter/recruiterRoute');
const { applicantRouter } = require('./routes/applicant/applicantRoute');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs'); 
const swaggerDocument = YAML.load('./swaggerUi/swagger.yaml');


const app = express();


app.use(upload());
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Enable credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/auth', authRouter);
app.use('/recruiter', recuriterRouter);
app.use('/applicant', applicantRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is listening at port : ${port}`);
  dbConnect();
});
