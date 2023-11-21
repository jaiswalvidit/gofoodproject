import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$/;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      passwordStrength: passwordRegex.test(password) ? 'strong' : 'weak',
      passwordMessage: passwordRegex.test(password)
        ? 'Strong password'
        : 'Weak password (minimum 8 characters, including uppercase, lowercase, numbers, and special characters)',
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
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
    <div className="py-5" style={{ background: 'rgba(255, 255, 0, 0.1)' }}>
      <div className="container">
        <form className="bg-white p-4 rounded shadow" onSubmit={handleSubmit}>
          <br />
          <h1 className="text-primary text-center">Registration Form</h1>

          {['name', 'email', 'password', 'confirmPassword', 'phone', 'geolocation'].map((fieldName) => (
            <div className="mb-3" key={fieldName}>
              <label htmlFor={fieldName} className="form-label text-capitalize">
                <strong>{fieldName === 'password' ? 'Password' : fieldName} :</strong>
                {fieldName !== 'password' && <sup className="text-danger">*</sup>}
              </label>
              {fieldName === 'password' ? (
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    id={fieldName}
                    name={fieldName}
                    value={credentials[fieldName]}
                    onChange={handleChange}
                    required={fieldName !== 'password'}
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              ) : (
                <input
                  type={fieldName === 'email' ? 'email' : 'text'}
                  className="form-control"
                  id={fieldName}
                  name={fieldName}
                  value={credentials[fieldName]}
                  onChange={handleChange}
                  required={fieldName !== 'password'}
                />
              )}

              {fieldName === 'password' && credentials.passwordStrength && (
                <div className={`text-${credentials.passwordStrength}`}>
                  {credentials.passwordMessage}
                </div>
              )}
            </div>
          ))}

          <div className="d-flex justify-content-center">
            <Link to="/auth/login" className="btn btn-danger me-2">
              Already a User
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
