import React, { useState } from 'react';

const AddItemForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState(
    {
        itemName: "Pasta Alfredo",
        cloudinaryImageId: "image3",
        category: "Pasta",
        parentName: "Italian Delight",
        Rating: 5,
        availability: true
      
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
 
  
    try {
      const response = await fetch('http://localhost:8001/api/createItem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
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
        
        itemName:'' ,
        cloudinaryImageId:'' ,
        category:'' ,
        parentName:'',
        Rating:'',
        availability:''
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
          Item Name:
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
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
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          ParentName:
          <input
            type="text"
            name="parentName"
            value={formData.parentName}
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
          Rating:
          <input
            type="text"
            name="Rating"
            value={formData.Rating}
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

        {/* <label>
          Delivery Time:
          <input
            type="text"
            name="DeliveryTime" // Update to match the case in the state
            value={formData.DeliveryTime}
            onChange={handleChange}
            required
          />
        </label>
        <br /> */}

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

export default AddItemForm;
