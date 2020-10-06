import Axios from "axios"
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_LIST_MY_FAIL, ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS } from "../constants/productConstants"

export const createOrder = (order) => async (dispatch, getState)=>{
    try{

       dispatch({
           type: ORDER_CREATE_REQUEST
       })

       const { userLogin: { userInfo }} = getState()

       const config = {
           headers: {
               'Content-type': 'application/json',
                Authrization: `Bearer ${userInfo.token}`
           }
       }
       const { data } = await Axios.put(`http://localhost:5000/api/orders`,order, config)
       dispatch({
           type: ORDER_CREATE_SUCCESS,
           payload: data
       })
    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error
        })
        console.log(error)
    }
}
export const getOrderDetials = (id) => async (dispatch, getState)=>{
    try{

       dispatch({
           type: ORDER_DETAILS_REQUEST
       })

       const { userLogin: { userInfo }} = getState()

       const config = {
           headers: {
                Authrization: `Bearer ${userInfo.token}`
           }
       }
       const { data } = await Axios.put(`http://localhost:5000/api/orders/${id}`, config)
       dispatch({
           type: ORDER_DETAILS_SUCCESS,
           payload: data
       })
    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error
        })
        console.log(error)
    }
}
export const payOrder = (orderId, paymentResult) => async (dispatch, getState)=>{
    try{

       dispatch({
           type: ORDER_PAY_REQUEST
       })

       const { userLogin: { userInfo }} = getState()

       const config = {
           headers: {
                'Content-type' : 'application/json',
                Authrization: `Bearer ${userInfo.token}`
           }
       }
       const { data } = await Axios.put(`http://localhost:5000/api/orders/${orderId}/pay`,paymentResult, config)
       dispatch({
           type: ORDER_PAY_SUCCESS,
           payload: data
       })
    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error
        })
        console.log(error)
    }
}
export const listMyOrders = () => async (dispatch, getState)=>{
    try{

       dispatch({
           type: ORDER_LIST_MY_REQUEST
       })

       const { userLogin: { userInfo }} = getState()

       const config = {
           headers: {
                Authrization: `Bearer ${userInfo.token}`
           }
       }
       const { data } = await Axios.get(`http://localhost:5000/api/orders/myorders`, config)
       dispatch({
           type: ORDER_LIST_MY_SUCCESS,
           payload: data
       })
    }catch(error){
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error
        })
        console.log(error)
    }
}