import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevtools } from 'redux-devtools-extension'
import { productListReducer, productDetailReducer, } from './reducers/productReducer' 
import { cartReducer } from './reducers/cartReducer'
import { userDetailReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducer'
import { orderCreateReducer, orderDetailsReducer, orderListMyReducer, orderPayReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdate: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer
})

const cartItemFromStorage = localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { 
        cartItems: cartItemFromStorage,
        shippingAddress: shippingAddressFromStorage
     },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk];

const store = createStore(reducer, initialState,applyMiddleware(...middleware))
export default store