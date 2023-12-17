import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import FoodDataCard from '../components/FoodDataCard';
import { IMAGE_URL } from "../constants";
const RestaurantDetail = () => {
  const { _id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`http://localhost:8001/api/auth/addRestaurant/${_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const dataArray = Array.isArray(data) ? data : [data];
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
    <div className="container mt-4">
      <h1 className="mt-4">Restaurant Detail</h1>

      {restaurant && (
        <>
          {/* <h2>{restaurant.restaurantName}</h2> */}
          <h2>{restaurant.restaurantName}</h2>
          <p>{restaurant.areaName}</p>
          <p><strong>Rating:</strong> {restaurant.Rating} - {restaurant.areaName}</p>
          <p><strong>Availability:</strong> {restaurant.availability ? 'Open' : 'Closed'}</p>
          <p><strong>Cuisines:</strong> {restaurant.cuisines.join(', ')}</p>

          <h3>Lists:</h3>

          {restaurant.lists.map((list) => (

            <div key={list._id} >
              <div style={{ marginBottom: '15px' }}>
                <FoodDataCard
                  foodItem={list}
                  url={`${IMAGE_URL}${list.cloudinaryImageID}`}
                />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RestaurantDetail;