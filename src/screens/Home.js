import React from "react";
import { Link } from 'react-router-dom';
import Navbar from "../components/Navbar";
const restaurantsData = [
  {
    info: {
      id: "108424",
      name: "Domino's Pizza",
      cloudinaryImageId: "vw6n5betlssnqelt7rmu",
      locality: "5TH Block",
      areaName: "Koramangala",
      costForTwo: "₹400 for two",
      avgRating: 4.3,
      cuisines: ["Pizzas", "Italian", "Pastas", "Desserts"],
    },
  },
  {
    info: {
      id: "140887",
      name: "McDonald's",
      cloudinaryImageId: "ee5f8e06b300efc07c9fe3f4df40dfc4",
      locality: "Mantri Avenue",
      areaName: "Koramangala",
      costForTwo: "₹400 for two",
      avgRating: 4.1,
      cuisines: ["Burgers", "Beverages", "Cafe", "Desserts"],
    },
  },
  {
    info: {
      id: "5934",
      name: "Burger King",
      cloudinaryImageId: "e33e1d3ba7d6b2bb0d45e1001b731fcf",
      locality: "Koramangala",
      areaName: "Koramangala",
      costForTwo: "₹350 for two",
      avgRating: 4.2,
      cuisines: ["Burgers", "American"],
    },
  },
];


const sampleReviews = [
  {
    id: 1,
    username: "John",
    rating: 4,
    comment: "Great food and quick delivery!",
  },
  {
    id: 2,
    username: "Alice",
    rating: 5,
    comment: "Awesome burgers! Will order again.",
  },
  {
    id: 3,
    username: "Bob",
    rating: 3,
    comment: "Decent but a bit pricey.",
  },
];

function RestaurantCard({ restaurant }) {
  const { info } = restaurant;
  const { name, cloudinaryImageId, avgRating, cuisines } = info;

  return (
    <div className="card m-3 bg-dark text-white rounded-40" style={{ maxWidth: "600px", borderRadius: "15px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)", transition: "transform 0.2s" }}>
      <img className="card rounded-50" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_400/${cloudinaryImageId}`} alt={name} style={{ maxHeight: "4700px", maxWidth: "670px", height: "auto", borderRadius: "15px 15px 5px 5px" }} />
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="card-title">{name}</h4>
          <span className="bg-success text-white rounded p-2 text-center" style={{ whiteSpace: "nowrap" }}>
            {avgRating} <span className="text-white">*</span>
          </span>
        </div>
        <p className="card-text" style={{ maxHeight: "80px", overflow: "hidden", textOverflow: "ellipsis" }}>
          {cuisines.length >= 3 ? cuisines.slice(0, 3).join(", ") + "..." : cuisines.join(", ")}
        </p>
      </div>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card bg-warning rounded text-secondary ">
        <div className="card-body">
          <h5 className="card-title  text-secondary fs-">{review.username}</h5>
          <p className="card-text">
            <span className="fw-bold text-danger fs-5">Rating:</span> {review.rating}
          </p>
          <p className="card-text fs-5 text-light">{review.comment}</p>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const filteredRestaurants = restaurantsData.slice(0, 3);

  return (
     <div className="" style={{background: "rgba(255, 255, 0, 0.1)"}}> 
    
      <div style={{ position: "relative" }}>
        <img className="img-fluid" src="https://source.unsplash.com/900x900/?food" alt="Food" style={{ width: "1400px", height: "650px", maxWidth: "100vw", objectFit: "cover" }} />
        <div className="text-white fs-1" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
          <div className="container text-center">
          <h1 className="display-1 text-light fw-bold " style={{ fontStyle: "italic" ,fontWeight: "1100" }}>GoFood</h1>

            <p className="lead display-5 text-white fs-4 fw-bold" style={{ fontStyle:"ita;ic"}}>
              Discover an exquisite world of culinary delights.
            </p>
            <Link to="/menu" className="btn text-white btn-danger btn-lg mt-4" role="button">
              Browse restaurants
            </Link>
          </div>
        </div>
      </div>

      <section className="py-5">
        <div className="container">
        <h2 className="display-6 fw-bold font-italic text-center">Famous Restaurants:</h2>
          <div className="row">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.info.id} className="col-md-4 mb-4">
                <Link to={"/restaurant/" + restaurant.info.id} style={{ textDecoration: "none" }}>
                  <RestaurantCard restaurant={restaurant} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 ">
        <div className="container">
        <h2 className="display-6 fw-bold font-italic text-center">Customer Reviews:</h2>
          <div className="row">
            {sampleReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
            
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <h2 className="display-6 fw-bold font-italic text-center">About Our Services:</h2>
          <p className="lead text-center fs-4 text-secondary">
            We are committed to providing you with the best dining experience.
          </p>
          <p className="text-center text-secondary fs-4">
            At GoFood, we offer a wide range of delicious dishes from various cuisines. Our dedicated staff ensures that your dining experience is exceptional.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;