import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const RestaurantDetail = () => {
  const { _id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/addRestaurant/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();

          // Check if data is an array, if not, put it into an array
          const dataArray = Array.isArray(data) ? data : [data];

          // Assuming you want to set the first item in the array as the restaurant
          setRestaurant(dataArray[0]);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRestaurantData();
  }, [_id]);

  return (
    <>
      <div className="container mt-4">
        <h1 className="mt-4">Restaurant Detail</h1>
        {restaurant && (
          <>
            <h2>{restaurant.restaurantName}</h2>
            <p>{restaurant.areaName}</p>
            <p>{restaurant.Rating} - {restaurant.areaName}</p>
            <p>Availability: {restaurant.availability ? 'Open' : 'Closed'}</p>
            <p>Cuisines: {restaurant.cuisines.join(', ')}</p>

            <h3>Lists:</h3>
            <ul>
              {restaurant.lists.map((list) => (
                <li key={list._id}>
                  {/* Render content for each item in the 'lists' array */}
                  {list.itemName} - {list.category}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default RestaurantDetail;
