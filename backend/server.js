import express from 'express';
import products from './data/products.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv'
import productsRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors'
import orderRoute from './routes/orderRoute.js'

dotenv.config()

connectDB();



const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/products', productsRoute)
app.use('/api/users', userRoute)
app.use('/api/orders',orderRoute)

app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

app.listen(5000, ()=> console.log('Running on 5000'))