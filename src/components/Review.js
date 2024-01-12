import React, { useState, useEffect } from 'react';

const Review = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [userName, setUserName] = useState('akash');
  const [parentOptions, setParentOptions] = useState([]);
  const [formData, setFormData] = useState({
    Message: '',
    Rating: 0,
    parentName: '',
    email: userEmail,
    name: userName,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8001/api/userdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const users = await response.json();
          const filteredUser = users.find((user) => user.email === userEmail);

          if (filteredUser) {
            console.log(filteredUser);
            console.log(filteredUser.name);
            setUserName(filteredUser.name);
          } else {
            console.error('User with email not found');
          }
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchData();
  }, [userEmail]);
  console.log(formData);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/auth/addrestaurant');
        const data = await response.json();
        const restaurantNames = data.map((restaurant) => restaurant.restaurantName);
        setParentOptions(restaurantNames);
      } catch (error) {
        console.error('Error fetching restaurant names:', error.message);
      }
    };

    fetchRestaurants();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8001/api/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      console.log(formData);
      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }
      const json = await response.json();
      console.log('API Response:', json);

      setFormData({
        Message: '',
        Rating: 0,
        parentName: '',
        email: userEmail,
        name: userName,
      });

      alert('Form filled successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
    <div className="text-center text-secondary fs-2 text-uppercase fw-2">Write a Comment </div>
      <form onSubmit={handleSubmit}>
        <div className="card bg-light m-2 p-2 d-flex justify-content-center  align-items-center  ">
          <div className="mb-4 mt-4">
            <div className="input-group">
              <input
                type="text"
                name="Message"
                className="form-control"
                placeholder="Your Message"
                id="Message"
                autoComplete="off"
                value={formData.Message}
                onChange={handleChange}
                required
              />
              <i className="input-icon uil uil-at"></i>
            </div>
          </div>

          <div className="mb-3">
            <div className="input-group">
              <input
                type="number"
                name="Rating"
                className="form-control"
                placeholder="Rating"
                id="Rating"
                autoComplete="off"
                value={formData.Rating}
                onChange={handleChange}
                required
              />
              <i className="input-icon uil uil-at"></i>
            </div>
          </div>

          
           <div className="mb-3">
            <label htmlFor="parentName" className="form-label  fs-3 text-primary">
              Restaurant:
            </label>
            <select
              name="parentName"
              value={formData.parentName}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="" disabled>
                Select a restaurant
              </option>
              {parentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className='btn btn-secondary'>Submit</button>
        </div>
      </form>
    </>
  );
};

export default Review;
