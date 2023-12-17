import React, { useState } from 'react';

const AddRestaurantForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: "Alpha", 
    areaName: "lucknow",
    Rating: 4,
    DeliveryTime: 45,
    availability: 'true',
    cloudinaryImageId:'12',
    parentId:'',
  });

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
      const response = await fetch('http://localhost:8001/api/auth/addRestaurant', {
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
        restaurantName: '',
        areaName: '',
        Rating: '',
        DeliveryTime: '',
        availability: '',
        cloudinaryImageId:'',
        parentId:'',
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
    <div div className="bg-danger">
      <div className="row ">
        <div className=" card col-8 m-10 p-10 justify-content-center">
      <h2 className='text-center fw-4 text-secondary pt-5' >Create a Restaurant</h2>
      <form className="custom-form m-2 p-2" onSubmit={handleSubmit}>
        <div className="mb-3 col-4">

          <label className="form-label fw-bold mt-4">Restaurant Name:</label>
          <input
            type="text" 
            className="form-control bg-light m-20"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mt-4">Area Name:</label>
          <input
            type="text"
            className="form-control bg-light m-20"
            name="areaName"
            value={formData.areaName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mt-4">Image:</label>
          <input
            type="text"
            className="form-control"
            name="cloudinaryImageId"
            value={formData.cloudinaryImageId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold mt-4">ParentId:</label>
          <input
            type="text"
            className="form-control"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 " >
          <label className="form-label fw-bold mt-4">Rating:</label>
          <input
            type="number"
            className="form-control"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3 row text-center">
  <label className="form-label fw-bold mt-4 col-md-3">Delivery Time:</label>
  <div className="col-md-6">
    <input
      type="text"
      className="form-control"
      name="DeliveryTime"
      value={formData.DeliveryTime}
      onChange={handleChange}
      required
    />
  </div>
</div>
        <div className="mb-3">
  <label className="form-label fw-bold mt-4">Availability:</label>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="availability"
      id="availabilityTrue"
      value="true"
      checked={formData.availability === 'true'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="availabilityTrue">True</label>
  </div>
  <div className="form-check form-check-inline">
    <input
      className="form-check-input"
      type="radio"
      name="availability"
      id="availabilityFalse"
      value="false"
      checked={formData.availability === 'false'}
      onChange={handleChange}
    />
    <label className="form-check-label" htmlFor="availabilityFalse">False</label>
  </div>
</div>
          <div className=" text-center"> <button type="submit" className="btn btn-primary">Add Restaurant</button></div>
       
      </form>
    </div>
    </div>
    </div>
    <div className="col-4">
      <img src="" alt="" />
    </div>
    </div>
  );
};

export default AddRestaurantForm;
