import React from 'react';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { Container } from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Product from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/registerScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';


function App() {
  return (
    <Router>
    <Header />
     <Container>
      <Route exact path="/" component={HomeScreen}  /> 
      <Route path="/product/:id" component={Product} />
      <Route path='/cart/:id?' component={CartScreen} />
      <Route path="/login" component={LoginScreen} />
      <Route path="/register" component={RegisterScreen} />
      <Route path="/profile" component={ProfileScreen} />
      <Route path="/shipping" component={ShippingScreen} />
      <Route path="/payment" component={PaymentScreen} />
      <Route path="/placeorder" component={PlaceOrderScreen} />
      <Route path="/order" component={OrderScreen} />
     </Container>
    <Footer />
    </Router>
  );
}

export default App;
