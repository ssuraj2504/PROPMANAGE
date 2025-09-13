const express = require('express');
const app = express();
const cors = require('cors');
require('./src/models/user');
require('./src/models/Property');
require('./src/models/maintainReq');
require('./src/models/payment')
const userRoutes = require('./src/routes/UserRoutes');
const propertyRoutes = require('./src/routes/PropertyRoutes');
const maintainRoutes = require('./src/routes/MaintainRoutes');
const paymentRoutes = require('./src/routes/PaymentRoutes');

app.use(cors({
  origin: "http://localhost:58433", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

const mongoose = require('mongoose');

const mongoUrl = 'mongodb+srv://admin:admin@cluster0.jbb8g4e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoUrl).then(()=>{
    console.log('connected to database');
}).catch(e=>console.log(e))

app.listen(3000, ()=>{
    console.log('server is running');
})

app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/maintenance', maintainRoutes);
app.use('/api/payments', paymentRoutes);


const User = mongoose.model('user');
const Property = mongoose.model('property');
const MaintainReq = mongoose.model('maintainReq');