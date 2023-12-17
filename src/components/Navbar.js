import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from 'react-bootstrap/Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import { LOG_URL } from '../constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [cartView, setCartView] = useState(false);
  const data = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const authToken = localStorage.getItem('authToken');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/auth/login'); // Redirect to the login page after logout
  };
  const dropdownItemStyles1 = {
    backgroundColor: 'transparent', // Remove the blue background color
    color: 'white', // Change the text color to black
    outline: 'none', // Remove the outline when focused
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fs-5" style={{ backgroundColor: 'rgba(0, 0, 0, 1.0)' }}>
        <div className="container-fluid">
          <Link className="navbar-brand border bg-white rounded-circle" to="/">
            <img
              src={LOG_URL}
              alt="Food Space"
              style={{
                maxWidth: '50px',
                height: 'auto',
                marginRight: '10px',
                marginTop: '2px',
              }}
            />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mx-2 px-3">
              <li className="nav-item px-3">
                <Link className={`nav-link px-3 ${location.pathname === '/' ? 'active' : ''}`} to="/" key="home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
              <Link
                className={`nav-link px-3 ${location.pathname === '/addItem' ? 'active' : ''}`}
                to="/addItem"
                key="additem"
              >
                Add Item
              </Link>
            </li>
            <li className="nav-item">
              {/* <Link
                className={`nav-link px-3 ${location.pathname === '/getItem' ? 'active' : ''}`}
                to="/getItem"
                key="getItem"
              >
                Get Item
              </Link> */}
            </li>
              <li className="nav-item">
              <Link
                className={`nav-link px-3 ${location.pathname === '/addrestaurant' ? 'active' : ''}`}
                to="/addrestaurant"
                key="addrestaurant"
              >
                Add Restaurant
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link px-3 ${location.pathname === '/display' ? 'active' : ''}`}
                to="/display"
                key="display"
              >
                Menu
              </Link>
            </li>
             
              
              <li className="nav-item">
                <Link
                  className={`nav-link px-3 ${location.pathname === '/about' ? 'active' : ''}`}
                  to="/about"
                  key="about"
                >
                  About
                </Link>
              </li>
        
              <li className="nav-item dropdown">
                {authToken ? (
                  <>
                    <Link
                      className={`nav-link navbar-dark dropdown-toggle ${location.pathname.startsWith('/dashboard/profile') ? 'active' : ''}`}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      key="user-dropdown"
                    >
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      {userEmail}
                    </Link>
                    <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                      <Link
                        className={`dropdown-item ${location.pathname === '/dashboard/profile' ? 'active' : ''}`}
                        to="/dashboard/profile"
                        key="profile"
                        style={dropdownItemStyles1}
                       
                      >
                        Profile
                      </Link>
                      <Link
                        className={`dropdown-item ${location.pathname === '/myorder' ? 'active' : ''}`}
                        to="/myorder"
                        key="orders"
                        style={dropdownItemStyles1}
                      >
                        Orders
                      </Link>
                      {/* <div className="dropdown-divider dropdown-menu-dark "></div> */}
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      className={`nav-link dropdown-toggle ${location.pathname.startsWith('/auth') ? 'active' : ''}`}
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      key="guest-dropdown" 
                    >
                      <FontAwesomeIcon icon={faUser} className="me-1" />
                      User
                    </Link>
                    <div className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                      <Link
                        className={`dropdown-item ${location.pathname === '/auth/login' ? 'active' : ''}`}
                        to="/auth/login"
                        key="login"  style={dropdownItemStyles1}
                      >
                        Login
                      </Link>
                      <Link
                        className={`dropdown-item ${location.pathname === '/auth/createuser' ? 'active' : ''}`}
                        to="/auth/createuser"
                        key="signup"  style={dropdownItemStyles1}
                      >
                        Signup
                      </Link>
                    </div>
                  </>
                )}
              </li>
              
            </ul>

            <div className="">
              {authToken ? (
                <button className="btn bg-white text-success mx-1" onClick={handleLogout} key="logout">
                  Logout
                </button>
              ) : (
                <>
                  <Link className={`btn bg-danger text-white mx-1 ${location.pathname === '/auth/login' ? 'active' : ''}`} to="/auth/login" key="login-btn">
                    Login
                  </Link>
                  <Link className={`btn bg-danger text-white mx-1 ${location.pathname === '/auth/createuser' ? 'active' : ''}`} to="/auth/createuser" key="signup-btn">
                    Signup
                  </Link>
                </>
              )}
            </div>
            <div className="d-flex align-items-center fs-1">
              <button className="btn btn mx-1 bg-danger text-light mx-1" onClick={loadCart} key="cart-btn">
                <FontAwesomeIcon icon={faShoppingCart} className="me-1" />Cart
                {data.length !== 0 && (
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {cartView && (
        <Modal show={cartView} onHide={() => setCartView(false)} dialogClassName="custom-modal-dialog modal-lg">
          <Modal.Header closeButton className="bg-warning">
            <Modal.Title className="text-danger">My Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-light">
            <Cart />
          </Modal.Body>
          <Modal.Footer className="bg-light">
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
