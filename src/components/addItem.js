import React, { useState, useEffect } from 'react';
import './additem.css';

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    cloudinaryImageId: '',
    category: '',
    parentName: '',
    Rating:'',
    cost: '',
    availability: true,
    description: '',
  });

  const [parentOptions, setParentOptions] = useState([]);
  const authToken = (localStorage.getItem('authToken'));
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
    if (!authToken) {
      console.error('User not authenticated. Please log in.');
      return;
    }
    console.log(formData);

    try {
      const response = await fetch('http://localhost:8001/api/auth/createItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      });

      console.log(response);
      console.log(authToken);
      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        return;
      }

      const json = await response.json();
      console.log('API Response:', json);

      setFormData({
        itemName: '',
        cloudinaryImageId: '',
        category: '',
        parentName: '',
        Rating: '',
        cost: '',
        availability: '',
        description: '',
      });

      alert('Form filled successfully');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const { itemName, cloudinaryImageId, category, parentName, Rating, cost, availability, description } = formData;

  return (
    <div className="container m-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4 text-center text-primary">Add a New Item</h2>
              <form className="custom-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  {/* <label htmlFor="itemName" className="form-label">Item Name:</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    placeholder='Name'
                    value={itemName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  {/* <label htmlFor="cloudinaryImageId" className="form-label">Image:</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="cloudinaryImageId"
                    value={cloudinaryImageId}
                    placeholder='Image'
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  {/* <label htmlFor="cost" className="form-label">Cost:</label> */}
                  <input
                    type="text"
                    className="form-control"
                    name="cost"
                    value={cost}
                    placeholder='Cost'
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  {/* <label htmlFor="description" className="form-label">Description:</label> */}
                  <input
                    type="textarea"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder='Description'
                    className="form-control"
                    required
                  />
                </div>

                <div className="input-group">
                  {/* <label htmlFor="category" className="form-label">Category:</label> */}
                  <input
                    type="text"
                    name="category"
                    value={category}
                    onChange={handleChange}
                    placeholder='Category'
                    className="form-control"
                    required
                  />
                </div>

                <div className="input-group">
                  {/* <label htmlFor="parentName" className="form-label">Restaurant:</label> */}
                  <select
                    name="parentName"
                    value={parentName}
                    onChange={handleChange}
                    placeholder='RestaurantName'
                    
                    className="form-select"
                    required
                  >
                    <option value="" disabled>Select a restaurant</option>
                    {parentOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  {/* <label htmlFor="Rating" className="form-label">Rating:</label> */}
                  <input
                    type="number"
                    name="Rating"
                    value={Rating}
                    placeholder='Rating'
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="availability" className="form-label">Availability:</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="availability"
                      id="availabilityTrue"
                      placeholder='Availability'
                      value="true"
                      checked={availability === true}
                      onChange={handleChange}
                    />
                    <label className="form-check-label px-1" htmlFor="availabilityTrue">True</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="availability"
                      id="availabilityFalse"
                      value="false"
                      checked={availability === false}
                      onChange={handleChange}
                    />
                    <label className="form-check-label px-1" htmlFor="availabilityFalse">False</label>
                  </div>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItemForm;
