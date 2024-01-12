import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
// import './Signup.css'; // Make sure to create Signup.css for your styles

const Signup = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    geolocation: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === 'password') {
      checkPasswordStrength(value);
    }

    if (name === 'phone') {
      checkMobileNumber(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    const isStrong = passwordRegex.test(password);
    setPasswordStrength(isStrong);
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      passwordStrength: isStrong ? 'strong' : 'weak',
      passwordMessage: isStrong
        ? 'Strong password'
        : 'Weak password (minimum 8 characters, including uppercase, lowercase, numbers, and special characters)',
    }));
  };

  const checkMobileNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      phoneError: phoneRegex.test(phone) ? '' : 'Mobile number must be 10 digits',
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if there are any errors before submitting
    if (credentials.phoneError) {
      alert('Please correct the form errors before submitting.');
      return;
    }

    const response = await fetch('http://localhost:8001/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('user_credentials', JSON.stringify(credentials));
      navigate('/auth/login');
    }
  };

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card bg-light text-info">
            <div className="card-body">
              <h1 className="text-center mb-4">Signup Page</h1>
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={credentials.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${
                        passwordStrength ? 'is-valid' : 'is-invalid'
                      }`}
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleTogglePassword}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  {passwordStrength && (
                    <div className="valid-feedback">{credentials.passwordMessage}</div>
                  )}
                  {!passwordStrength && (
                    <div className="invalid-feedback">{credentials.passwordMessage}</div>
                  )}
                </div>

                <div className="mb-3">
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={credentials.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      required
                    />
                    <div className="input-group-append">
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={handleToggleConfirmPassword}
                      >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      credentials.phoneError ? 'is-invalid' : ''
                    }`}
                    id="phone"
                    name="phone"
                    value={credentials.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                  />
                  {credentials.phoneError && (
                    <div className="invalid-feedback">{credentials.phoneError}</div>
                  )}
                </div>

                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="geolocation"
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={handleChange}
                    placeholder="Location"
                    required
                  />
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                  <Link to="/auth/login" className="btn btn-danger ms-2">
                    Already Signin
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
