import React, { useState, useEffect } from 'react';

const AddItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: 'Pasta Alfredo',
    cloudinaryImageId: 'image3',
    category: 'Pasta',
    parentName: '', 
    Rating: 5,
    cost: 1,
    availability: true,
    description: 'optional',
  });

  const [parentOptions, setParentOptions] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/auth/addrestaurant');
        const data = await response.json();
        console.log(data[0]);
        // Assuming your API response has an array of restaurant objects with a 'name' property
        const restaurantNames = data.map((restaurant) => restaurant.restaurantName);
        console.log(restaurantNames);
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
    console.log(formData);

    try {
      const response = await fetch('http://localhost:8001/api/auth/createItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="mb-4 text-center text-primary">Add a New Item</h2>
        <form onSubmit={handleSubmit}>

          {/* First Column */}
          <div className="row">
            <div className="col-md-6">

              <div className="mb-3">
                <label htmlFor="itemName" className="form-label fw-bold">
                  Item Name:
                </label>
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cloudinaryImageId" className="form-label fw-bold">
                  Image:
                </label>
                <input
                  type="text"
                  name="cloudinaryImageId"
                  value={formData.cloudinaryImageId}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="cost" className="form-label fw-bold">
                  Cost:
                </label>
                <input
                  type="text"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

            </div>

            {/* Second Column */}
            <div className="col-md-6">

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-bold">
                  Description:
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="category" className="form-label fw-bold">
                  Category:
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="parentName" className="form-label fw-bold">
                  Parent Name (Restaurant):
                </label>
                <select
                  name="parentName"
                  value={formData.parentName}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="" disabled>Select a restaurant</option>
                  {parentOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Rating:</label>
                <input
                  type="number"
                  name="Rating"
                  value={formData.Rating}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Availability:</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="availability"
                    id="availabilityTrue"
                    value="true"
                    checked={formData.availability === true}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="availabilityTrue">
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="availability"
                    id="availabilityFalse"
                    value="false"
                    checked={formData.availability === false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="availabilityFalse">
                    False
                  </label>
                </div>
              </div>

            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
