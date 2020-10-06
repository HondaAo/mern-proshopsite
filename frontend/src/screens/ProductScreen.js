import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../Components/Rating';
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../action/productAction'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(0);
    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail);
    const { product, error, loading } = productDetail

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
    },[dispatch, match])

    const addtoCartHandler = ()=>{
      history.push(`/cart/${match.params.id}?qty=${qty}`)
      
    }
    return (
        <>
         <Link className="btn btn-dark my-3" to="/">Go Back</Link> 
         { loading ? <h2>Loading...</h2> : error ? <h1>{error}</h1> : (
         <Row>
             <Col md={6} fluid>
               <img src={product.image} alt={product.name} />
             </Col>
             <Col md={3}>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                       <h3>{product.name}</h3>
                   </ListGroup.Item>
                   <ListGroup.Item>
                       <Rating value={product.rating} text={`${product.numReviews}`} />
                   </ListGroup.Item>
                   <ListGroup.Item>
                       Price: ${product.price}
                   </ListGroup.Item>
                   <ListGroup.Item>
                       Description: {product.description}
                   </ListGroup.Item>
               </ListGroup>
             </Col>
             <Col md={3}>
                 <Card>
                     <ListGroup variant="flush">
                         <ListGroup.Item>
                             <Row>
                                 <Col>Price:</Col>
                                 <Col>${product.price}</Col>
                             </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                             <Row>
                                 <Col>Stock:</Col>
                                 <Col>{product.countInStock}</Col>
                             </Row>
                         </ListGroup.Item>
                         {product.countInStock > 0 && (
                         <ListGroup.Item>
                             <Row>
                                 <Col>qty</Col>
                                 <Col>
                                  <Form.Control as='select' value={qty} onChange={(e)=> setQty(e.target.value)}>
                                    {
                                   [...Array(product.countInStock).keys()].map(x => (
                                       <option key={x + 1} value={x +1}>
                                           {x + 1}
                                       </option>
                                   ))
                                    }
                                  </Form.Control>
                                 </Col>
                             </Row>
                         </ListGroup.Item>)}
                         <ListGroup.Item>
                             <Button className="btn btn-block" type="button" onClick={addtoCartHandler}>
                                 Add To Cart
                             </Button>
                         </ListGroup.Item>
                     </ListGroup>
                 </Card>
             </Col>
         </Row>  
        )}
        </>
    )
}
export default ProductScreen;