import React from "react";

const RestaurantCard = (props) => {
  const { resData } = props;
  const {
    cloudinaryImageId,
    restaurantName,
    areaName,
    Rating,
    cuisines,
    availability,
    DeliveryTime,
  } = resData;

  // Create a set of unique cuisine categories
  const uniqueCuisineCategories = new Set(cuisines.map((cuisine) => cuisine.category));

  return (
    <div className="card m-3 bg-dark text-white rounded-40"
      style={{
        maxWidth: "600px",
        borderRadius: "15px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <img className="card rounded-50"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_400/${cloudinaryImageId}`}
        alt={restaurantName}
        style={{
          maxHeight: "4700px",
          maxWidth: "670px",
          height: "auto",
          borderRadius: "15px 15px 5px 5px",
        }}
      />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="card-title">{restaurantName}-({areaName})</h4>
          <span className="bg-success text-white rounded p-2 text-center" style={{ whiteSpace: "nowrap" }}>
            {Rating} <span className="text-white">*</span>
          </span>
        </div>
        <p className="card-text"
          style={{
            maxHeight: "80px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        ></p>
        <div className="d-flex justify-content-between align-items-center">
          <p>{DeliveryTime} minutes</p>
          <p>
            <strong>Cuisines:</strong>
            {[...uniqueCuisineCategories].map((category) => (
              <div key={category}>
                {category}
              </div>
            ))}
            {availability ? (
              <span className="text-success">Open Now</span>
            ) : (
              <span className="text-danger">Closed</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
