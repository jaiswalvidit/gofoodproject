import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import RestaurantCard from './RestaurantCard'; // Import the RestaurantCard component
import Shimmer from './Shimmer';

const Display = () => {
  const [restaurantList, setRestaurantList] = useState([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch('http://localhost:8001/api/auth/addRestaurant/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

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
          {restaurantList && restaurantList.length > 0 ? (
           restaurantList.map((restaurant) => (
            <div key={restaurant.id} className="col-md-4 mb-4">
              <Link to={"/display/"+restaurant._id} style={{ textDecoration: "none" }}>
                <div className="">
                  <RestaurantCard resData={restaurant} />
                </div>
              </Link>
            </div>
          ))
          
            
          ) : (
            <div className="col-md-12 text-center">
              <div>
                <Shimmer />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Display;
