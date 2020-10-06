import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {login} from '../action/userAction'
import FormContainer from '../Components/FormController';
import { useDispatch,useSelector } from 'react-redux'

const LoginScreen = ({location, history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(()=>{
        if(userInfo){
          history.push(redirect)
        }
    },[userInfo])
    
    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))
    }
    return (
        <FormContainer>
          <h1>Sign In</h1>  
          {error && <h1 style={{ color: 'red'}}>{error}</h1>}
          {loading && <h1>Loading...</h1>}
          <Form onSubmit={submitHandler}>
              <Form.Group controlId='email'>
                  <Form.Label>
                      Email Address
                  </Form.Label>
                  <Form.Control type="email" placeholder="email" onChange={(e)=> setEmail(e.target.value)}>
                  </Form.Control>
                  <Form.Label>
                      Password
                  </Form.Label>
                  <Form.Control type="password" placeholder="password" onChange={(e)=> setPassword(e.target.value)}>
                  </Form.Control>
              </Form.Group>
              <Button type="submit" variant="primary">
                  Sign In
              </Button>
          </Form>
          <Row className="py-3">
              <Col>
               New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link>
              </Col>
          </Row>
        </FormContainer>
    )
}

export default LoginScreen
