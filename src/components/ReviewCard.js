
import React from 'react';

function ReviewCard({ review }) {
  return (
    <div className="card">
      <div className="card bg-warning rounded text-secondary">
        <div className="card-body">
          <h5 className="card-title text-secondary fs-">{review.name}</h5>
          <p className="card-text">
            <span className="fw-bold text-danger fs-5">Rating:</span> {review.Rating}
          </p>
          <p className="card-text fs-5 text-secondary">{review.Message}</p>
          <p className="card-text fs-5 text-primary">Restaurant-{review.parentName}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
