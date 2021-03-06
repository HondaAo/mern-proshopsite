import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../Components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productAction';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const productList = useSelector(state=> state.productList)
  const { loading, products, error } = productList
    useEffect(()=>{
      dispatch(listProducts())
    },[dispatch])
    return (
        <>
          <h1>Latest Products</h1>
          {loading ? <h1>Loading...</h1> : error ? <h3>{error}</h3> : (
          <Row>
              {products.map(product => 
              (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
               <Product product={product}  />
              </Col>
              ))
             }
          </Row>  
          )}
        </>
    )
}

export default HomeScreen
