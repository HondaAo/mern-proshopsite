import { redirect } from 'next/dist/next-server/server/api-utils';
import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {login, register, updateUserProfile} from '../action/userAction'
import { useDispatch,useSelector } from 'react-redux'
import { getUserDetail } from '../action/userAction';
import { listMyOrders } from '../action/orderAction';
import { LinkContainer } from 'react-router-bootstrap';

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');
    const [confirmPassword, setConfirmPassword ] = useState('')
    const [ message, setMessage] = useState('')
    
    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userDetails= useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin= useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { success } = userUpdate

    const orderListMy= useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    const dispatch = useDispatch()
    useEffect(()=>{
        if(!userInfo){
          history.push('/login')
        }else{
            if(!user.name){
              dispatch(getUserDetail('profile'))
              dispatch(listMyOrders())
            }else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history, userInfo, dispatch, user])
   
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Please confirm your password')
        }else{
            dispatch(updateUserProfile({ id: user._id, name, email, password}))   
        }
        
    }
    return (
        <Row>
         <Col md={3}>
          <h1>Sign In</h1>  
          {message && <h2>{message}</h2>}
          {error && <h1 style={{ color: 'red'}}>{error}</h1>}
          {success && <h2>Successfully Updated!!</h2>}
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
         </Col>
         <Col md={9}>
          {loadingOrders ? <h2>Loading...</h2> : errorOrders ? <h3>{errorOrders}</h3> : (
              <Table striped bordered hover responsive className="table-sm">
                  <tread>
                      <tr>
                          <th>ID</th>
                          <th>DATE</th>
                          <th>TOTAL</th>
                          <th>PAID</th>
                          <th>DELIVERED</th>
                          <th></th>
                      </tr>
                  </tread>
                  <tbody>
                      {orders.map(order => (
                          <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.createdAt.substring(0,10)}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.substring(0,10): (
                                  <i className="fas fa-times" style={{ color: 'red' }} />
                              )}</td>
                              <td>{order.isDelivered ? order.deliveredAt.substring(0,10): (
                                  <i className="fas fa-times" style={{ color: 'red' }} />
                              )}</td>
                              <td>
                                  <LinkContainer to={`/order/${order._id}`}>
                                      <Button variant='light'>Details</Button>
                                  </LinkContainer>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </Table>
          )}
         </Col>
        </Row>
    )
}

export default ProfileScreen
