import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ReviewCard from "../components/ReviewCard";
import Display from "../components/Display";

function Home() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8001/api/review', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const reviewsData = await response.json();
          setReviews(reviewsData);
        } else {
          console.error('Failed to fetch reviews');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="your-class-name">
      <div style={{ position: "relative" }}>
        <img className="img-fluid" src="https://source.unsplash.com/900x900/?food" alt="Food" style={{ width: "1400px", height: "650px", maxWidth: "100vw", objectFit: "cover" }} />
        <div className="text-white fs-1" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 1 }}>
          <div className="container text-center">
          <h1 className="display-1 text-light fw-bold " style={{ fontStyle: "italic" ,fontWeight: "1100" }}>GoFood</h1>

            <p className="lead display-5 text-white fs-4 fw-bold" style={{ fontStyle:"ita;ic"}}>
              Discover an exquisite world of culinary delights.
            </p>
            <Link to="/display" className="btn text-white btn-danger btn-lg mt-4" role="button">
              Browse restaurants
            </Link>
          </div>
        </div>
      </div>
      <Display />

      <section className="py-5 m-2">
        {/* <div className="container"> */}
          <h2 className="fw-bold font-italic text-center">Customer Reviews:</h2>
          <div className="row">
            {reviews.map((review) => (
              <div key={review._id} className="col-md-4 p-2 my-2">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        {/* </div> */}
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
