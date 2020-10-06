import React, { useEffect } from 'react'
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
//import Message from '../Components/Message'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../action/cartAction'

const CartScreen = ({ match, location, history}) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    const dispatch = useDispatch()
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
            console.log(cartItems)
        }
    },[dispatch, productId, qty])
    const removeFromCartHandler = (id)=>{
       dispatch(removeFromCart(id))
    }
    const checkoutHandler = ()=>{
        history.push('/login?redirect=shipping')
    }
    return (
        <Row>
          <Col md={8}>
              <h1>Shopping cartAction</h1>
              {cartItems.length === 0 ? <h2>Your cart is empty.<Link to='/'>Go Back</Link></h2> : (
                  <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt="itemImage" fluid />
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>{item.price}</Col>
                                <Col md={2}>
                                    <Form.Control as='select' value={qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                                    {
                                   [...Array(item.countInStock).keys()].map(x => (
                                       <option key={x + 1} value={x +1}>
                                           {x + 1}
                                       </option>
                                   ))
                                    }

                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button type="button" variant="light" onClick={()=> removeFromCartHandler(item.product)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                  </ListGroup>
              )}
          </Col> 
          <Col md={4}>
            <Card>
             <ListGroup variant="flush">
                 <ListGroup.Item>
                     <h2>Subtotal ({cartItems.reduce((acc, item)=> acc + item.qty, 0)}) items</h2>
                     ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed()}
                 </ListGroup.Item>
                 <ListGroup.Item>
                     <Button type='button' className="btn-block" disable={cartItems.length === 0 } onClick={checkoutHandler}>
                         Check out
                     </Button>
                 </ListGroup.Item>
             </ListGroup>
            </Card>
          </Col>
        </Row>
    )
}

export default CartScreen
