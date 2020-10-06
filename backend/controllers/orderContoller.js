import Order from '../models/orederModel.js'
import asyncHandler from 'express-async-handler'

const addOrderItems = asyncHandler(async (req,res)=>{
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice } = req.body
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No order exists')
        return
    }
    else{
        const order = new Order({
            orderItems, 
            user: req.user._id,
            shippingAddress, 
            paymentMethod, 
            itemsPrice, 
            taxPrice, 
            shippingPrice  
        })
        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
    res.json(products)
})
const getOrderById = asyncHandler(async (req,res)=>{
    const order = await (await Order.findById(req.params.id)).populated('user','name email')
    if(order){
        res.json(order)
    }else{
        res.status(404)
    }
})

const updateOrderToPaid = asyncHandler(async (req,res)=>{
    const order = await Order.findById(req.params.id)
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now()
        order.paymentResults = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    }else{
        res.status(404)
    }
})
const getMyOrder = asyncHandler(async (req,res)=>{
    const order = await Order.findById({user: req.user._id})

    res.json(order)
})


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrder
}
