import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Display = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/addRestaurant/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (Array.isArray(data)) {
            setRestaurantList(data);
          } else {
            console.error('Error: Response data is not an array');
          }
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRestaurantData();
  }, []); 

  return (
    <div>
      <div className="container mt-4">
        <h1 className="mt-4">Restaurant List</h1>
        <div className="row">
          {restaurantList.map((restaurant) => (
            <div key={restaurant._id} className="col-md-4 mb-4">
              <Link to={`/display/${restaurant._id}`} className="card-link">
                <div className="card h-100">
                  <img src={`URL_TO_RESTAURANT_IMAGE/${restaurant.cloudinaryImageId}`} className="card-img-top" alt={restaurant.restaurantName} />
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.restaurantName}</h5>
                    <p className="card-text">{restaurant.areaName}</p>
                    <p className="card-text">{restaurant.Rating} - {restaurant.areaName}</p>
                    <p className="card-text">Availability: {restaurant.availability ? 'Open' : 'Closed'}</p>
                    <p className="card-text">Cuisines: {restaurant.cuisines.join(', ')}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Display;
