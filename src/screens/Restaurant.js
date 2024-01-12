import React, { useState } from 'react';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Restaurant.css';

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    areaName: '',
    Rating: '',
    DeliveryTime: '',
    availability: false,  // Set default value to false for the checkbox
    cloudinaryImageId: '',
  });
  const authToken = (localStorage.getItem('authToken'));
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!authToken) {
      console.error('User not authenticated. Please log in.');
      return;
    }
    console.log(formData);
    try {
      const response = await fetch('http://localhost:8001/api/auth/addRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      });

      console.log(response);

      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }

      const json = await response.json();
      console.log('API Response:', json);

      alert('Form filled successfully');

      setFormData({
        restaurantName: '',
        areaName: '',
        Rating: '',
        DeliveryTime: '',
        availability: false,  // Reset checkbox to false after submission
        cloudinaryImageId: '',
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="card text-secondary bg-light text-center m-2">
      <div className="row justify-content-center">
        <div className="col-md-6 mt-5">
          <h2 className="heading text-center text-dark mb-4">Create a Restaurant</h2>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                placeholder='RestaurantName'
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="areaName"
                name="areaName"
                value={formData.areaName}
                placeholder='Areaname'
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="cloudinaryImageId"
                name="cloudinaryImageId"
                placeholder='Image'
                value={formData.cloudinaryImageId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="Rating"
                name="Rating"
                value={formData.Rating}
                placeholder='Rating'
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="DeliveryTime"
                name="DeliveryTime"
                placeholder='Delievry Time'
                value={formData.DeliveryTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Availability:</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="availability"
                  id="availabilityCheckbox"
                  onChange={handleChange}
                  value="true"
                />
                <label className="form-check-label" htmlFor="availabilityCheckbox">
                  <FontAwesomeIcon icon={faCheckCircle} /> Available
                </label>
              </div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Add Restaurant
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurantForm;
