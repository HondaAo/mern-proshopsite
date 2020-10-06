import Axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder, getOrderDetials, payOrder } from '../action/orderAction';
import {PayPalButton} from 'react-paypal-button-v2'
import { ORDER_PAY_RESET } from '../constants/productConstants';

const OrderScreen = ({ history,match }) => {
    const orderId = match.params.id
    const [ sdkReady, setSdkReady ] = useState(false);
    const dispatch = useDispatch()
    const orderDetails = useSelector(state=> state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector(state=> state.orderPay)
    const { success: successPay, loading: loadingPay } = orderPay
    if(!loading){
       const addDecimals = (num)=>{
       return (Math.round(num * 100)/100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.itemsPrice.reduce((acc, item)=> acc + item.price * item.qty, 0) )
    }
    useEffect(()=>{
        const addPaypalScript = async ()=>{
            const { data: clientId } = await Axios.get('http://localhost:5000/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = ()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if(!order || successPay){
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetials(orderId))
        }else if(!order.isPaid){
            if(!window.paypal){
                addPaypalScript()
            }else{
                setSdkReady(true)
            }
        }
        
    },[history,orderId, successPay, order])

    const successPpaymentHandler = (paymentResult)=>{
       console.log(paymentResult)
       dispatch(payOrder(orderId, paymentResult))
    }
    
    return (
       loading ? <h1>Loading...</h1> : error ? <h2>{error}</h2> :
       <>
       <h1>Order {order._id}</h1>
       <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name:</strong>{order.user.name}</p>
                        <p><strong>Email:</strong><a href={`/mailto:${order.user.email}`} >{order.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {order.shippingAddress.address},{order.shippingAddress.city},{' '}{order.shippingAddress.postalCode},{' '}{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <h2>delivered on {order.deliveredAt}</h2>:<h2>Not delivered</h2>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                        <strong>Method:</strong>
                        {order.paymentMethod}
                        </p>
                        {order.isPaid ? <h2>Paid on {order.paidAt}</h2>:<h2>Not Paid</h2>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h2>Order Item</h2>
                        {order.orderItem.length === 0 ? <h2>Your cart is empty.</h2>:(
                            <ListGroup.Item>
                                {order.cartItem.map((item, index)=>(
                                    <ListGroup.Item >
                                    <Row>
                                       <Col md={1}>
                                         <Image
                                           src={item.image}
                                           alt={item.name}
                                           fluid
                                           rounded
                                         />
                                       </Col>
                                       <Col>
                                         <Link to={`/product/${item.product}`}>
                                           {item.name}
                                         </Link>
                                       </Col>
                                       <Col md={4}>
                                         {item.qty} x ${item.price} = ${item.qty * item.price}
                                       </Col>
                                     </Row>

                                    </ListGroup.Item>
                                ))}
                            </ListGroup.Item>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  {!order.isPaid && (
                      <ListGroup.Item>
                          {loadingPay && <h2>Loading...</h2>}
                          {!sdkReady ? <h2>Loading...</h2> : (
                              <PayPalButton amount={order.totalPrice} onSuccess={successPpaymentHandler} />
                          )}
                      </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
        </Row>
       </>
    )
}

export default OrderScreen
