import React, { useState } from 'react';
// import data from '../RestaurantData';
// {
//     "restaurantName": "Sam",
//     "areaName": "Sam",
//     "cost": 20,
//     "cuisines": "Sample Cuisine",
//     "Rating": 4.5,
//     "DelieveryTime": 30,
//     "availability": true,
//     "_id": "657615115481d4921dbfa705",
//     "createdAt": "2023-12-10T19:44:17.933Z",
//     "updatedAt": "2023-12-10T19:44:17.933Z",
//     "__v": 0
//   }
const AddRestaurantForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
  
    restaurantName: "Alpha", 
    areaName: "lucknow",
    
    
    Rating: 4,
    DeliveryTime: 45,
    availability: 'true',
    cloudinaryImageId:'12',
    parentId:'',
  });

  // Function to handle form input changes
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
    // const { restaurantName, areaName, cost, cuisines, Rating, DelieveryTime, availability } = formData;
  
    try {
      const response = await fetch('http://localhost:8001/api/addRestaurant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Use application/json instead of multipart/form-data
        },
        body: JSON.stringify(formData),
        
      });
      console.log(response);
  
      if (!response.ok) {
        console.error(`Request failed with status ${response.status}`);
        // Handle error here, e.g., show an error message to the user
        return;
      }
  
      const json = await response.json();
      console.log('API Response:', json);
  
      // Add logic for handling the API response, e.g., show a success message
  
      // Reset the form after submission
      setFormData({
        
        restaurantName: '',
        areaName: '',
        // cost: '',
        // cuisines: '',
        Rating: '',
        DeliveryTime: '',
        availability: '',
        cloudinaryImageId:'',
        parentId:''
      });
    } catch (error) {
      console.error('Error:', error.message);
      // Handle other errors here
    }
  };
  
  return (
    <div>
      <h2>Add a New Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Restaurant Name:
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
       
        <label>
          Area Name:
          <input
            type="text"
            name="areaName"
            value={formData.areaName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="cloudinaryImageId"
            value={formData.cloudinaryImageId}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          ParentId:
          <input
            type="text"
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        {/* <label>
          Cost:
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </label>
        <br /> */}

        {/* <label>
          Cuisines:
          <input
            type="text"
            name="cuisines"
            value={formData.cuisines}
            onChange={handleChange}
            required
          />
        </label>
        <br /> */}

        <label>
          Rating:
          <input
            type="number"
            name="Rating"
            value={formData.Rating}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Delivery Time:
          <input
            type="text"
            name="DeliveryTime" // Update to match the case in the state
            value={formData.DeliveryTime}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Availability:
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add Restaurant</button>
      </form>
    </div>
  );
};

export default AddRestaurantForm;
