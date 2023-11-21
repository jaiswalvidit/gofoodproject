import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { CartProvider } from './components/ContextReducer';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import RestaurantPage from './components/RestaurantPage';
import MyOrder from './screens/MyOrders';
import About from './components/about';
import Contact from './components/Contact';
import Cancel from './components/Cancel';
import Success from './components/Success';

import Profile from './components/Profile';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Body from './components/Body';
function App() {
  return (
    <>
    <CartProvider>
      
      <Router>
      <Navbar/>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Body />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/createuser" element={<Signup />} />
            <Route path="/myorder" element={<MyOrder />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard/profile" element={<Profile />} />
            <Route path="/restaurant/:resId" element={<RestaurantPage />} />
          </Routes>
        </div>
        <Footer/>
      </Router>
    </CartProvider>
  
    </>
  );
}

export default App;
