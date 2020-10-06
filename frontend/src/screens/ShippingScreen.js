import { redirect } from 'next/dist/next-server/server/api-utils';
import React, { useEffect, useState } from 'react'
import { Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../Components/FormController';
import { useDispatch,useSelector } from 'react-redux'
import { saveShippingAddress } from '../action/cartAction';
import CheckoutSteps from '../Components/CheckoutSteps';


const ShippingScreen = ({history}) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [ address, setAddress ] = useState(shippingAddress.address)
    const [ city, setCity ] = useState(shippingAddress.city)
    const [ postalCode, setPostalCode ] = useState(shippingAddress.postalCode)
    const [ country, setCountry ] = useState(shippingAddress.country)
    const dispatch = useDispatch();

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
         <CheckoutSteps step1 step2 />
          <Form onSubmit={submitHandler}>
              <Form.Label>
                  Address
              </Form.Label>
              <Form.Control
              type="address"
              placeholder="Enter address"
              value={address}
              onChange={(e)=> setAddress(e.target.value)}
              >
              </Form.Control>
              <Form.Label>
                  City
              </Form.Label>
              <Form.Control
              type="address"
              placeholder="Enter city"
              value={city}
              onChange={(e)=> setCity(e.target.value)}
              >
              </Form.Control>
              <Form.Label>
                  postalCode
              </Form.Label>
              <Form.Control
              type="postalCode"
              placeholder="Enter postalCode"
              value={postalCode}
              onChange={(e)=> setPostalCode(e.target.value)}
              >
              </Form.Control>
              <Form.Label>
                  Country
              </Form.Label>
              <Form.Control
              type="Country"
              placeholder="Enter Country"
              value={country}
              onChange={(e)=> setCountry(e.target.value)}
              >
              </Form.Control>
            
          <Button type='submit' variant="primary">
              Continue
          </Button>
          </Form>
        </FormContainer>
    )
}

export default ShippingScreen
