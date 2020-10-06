import { redirect } from 'next/dist/next-server/server/api-utils';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {login, register} from '../action/userAction'
import FormContainer from '../Components/FormController';
import { useDispatch,useSelector } from 'react-redux'

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage] = useState('')
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    useEffect(()=>{
        if(userInfo){
          history.push(redirect)
        }
    },[history, userInfo, redirect])
    const dispatch = useDispatch()
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Please confirm your password')
        }else{
         dispatch(register(name,email,password))   
        }
        
    }
    return (
        <FormContainer>
        <h1>Sign In</h1>  
        {message && <h2>{message}</h2>}
        {error && <h1 style={{ color: 'red'}}>{error}</h1>}
        {loading && <h1>Loading...</h1>}
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label>
                    Name
                </Form.Label>
                <Form.Control type="text" placeholder="name" onChange={(e)=> setName(e.target.value)}>
                </Form.Control>
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
                <Form.Label>
                    Confirm Password
                </Form.Label>
                <Form.Control type="password" placeholder="password" onChange={(e)=> setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
                Register
            </Button>
        </Form>
        <Row className="py-3">
            <Col>
             Have an account? {' '}<Link to={redirect ? `/login?redirect=${redirect}`: '/login'}>Log in</Link>
            </Col>
        </Row>
      </FormContainer>
    )
}

export default RegisterScreen
