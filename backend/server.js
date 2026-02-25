const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', authRoutes);
app.use('/emails', emailRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}` );
});