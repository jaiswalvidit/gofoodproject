import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://gofoodproject.vercel.app/api/auth/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:credentials.name, email: credentials.email, password: credentials.password }),
      });

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        setError('Invalid credentials');
      } else {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        localStorage.setItem('userdetails',JSON.stringify(json));
       console.log(JSON.stringify(json));

        navigate('/');
      }
    } catch (err) {
      console.error('An error occurred:', err);
      setError('An error occurred while logging in');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className=" py-5 " style={{background: "rgba(255, 255, 0, 0.1)"}}>
      
      <div className="container">
        <form className="bg-light p-4  rounded shadow" onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <h1 className="text-primary text-center">LOGIN FORM</h1>
            </legend>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                <h4>
                  <strong>EMAIL </strong> <sup className="text-danger">*</sup>
                </h4>
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-label="Email"
                aria-labelledby="emailLabel"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <div id="emailHelp" className="form-text text-muted">
                We'll never share your email with anyone else.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                <h4>
                  <strong>PASSWORD </strong> <sup className="text-danger">*</sup>
                </h4>
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                aria-label="Password"
                aria-labelledby="passwordLabel"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Submit'}
              </button>
              <Link to="/auth/createuser" className="btn btn-link">
                New User
              </Link>
            </div>
          </fieldset>
        </form>

        <div className="mt-3"></div>
      </div>
      
    </div>
  );
}
