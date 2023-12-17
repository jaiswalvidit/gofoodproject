import React, { useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import { IMAGE_URL } from '../constants';

function FoodDataCard({ foodItem }) {
  const dispatch = useDispatchCart();
  const data = useCart();

  const fixedPrice = foodItem.cost;
  const [qty, setQty] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const finalPrice = qty * fixedPrice;

  const handleAddToCart = async () => {
    if (qty > 0) {
      const existingFoodIndex = data.findIndex(item => item.id === foodItem._id);

      if (existingFoodIndex !== -1) {
        const existingFood = data[existingFoodIndex];
        await dispatch({ type: 'UPDATE', index: existingFoodIndex, qty: existingFood.qty + qty });
      } else {
        await dispatch({
          type: 'ADD',
          id: foodItem._id,
          name: foodItem.itemName,
          price: fixedPrice,
          qty,
          imageId: foodItem.cloudinaryImageId,
          description: foodItem.description
        });
      }

      setAddedToCart(true);
      setQty(0);
      console.log(data);
    }
  };

  const decrementQty = () => qty > 0 && setQty(qty - 1);
  const incrementQty = () => setQty(qty + 1);

  useEffect(() => {
    let timer;
    if (addedToCart) {
      timer = setTimeout(() => setAddedToCart(false), 400);
    }
    return () => clearTimeout(timer);
  }, [addedToCart]);

  return (
    <div className="card m-2 bg-light text-dark rounded-20" style={{ maxWidth: "400px", borderRadius: "10px", boxShadow: "2px 4px 2px rgba(0, 0, 0, 0.6)", transition: "transform 0.2s" }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
    >
      <img className='img-fluid rounded' src={`${IMAGE_URL}${foodItem.cloudinaryImageId}`} alt='Food' style={{ objectFit: 'contain', width: "100%", maxHeight: "200px" }} />
      <div className='card-body text-center'>
        <div className='row'>
          <div className='col-md-7'>
            <h5 className='card-title text-secondary fs-5'>{foodItem.itemName}</h5>
            <p className='card-text text-primary fs-6'>Rs {foodItem.cost}</p>
            
          </div>
          <div className='col-md-5'>
            <div className='quantity-control text-success fs-6'>
              <button className='btn btn-success btn-sm px-1' onClick={decrementQty} style={{ width: '30px' }}> - </button>
              <span className='quantity-display fs-6 px-2 m-1'>{qty}</span>
              <button className='btn btn-success btn-sm' onClick={incrementQty} style={{ width: '30px' }}> + </button>
            </div>
            <p className='mt-2 text-success fs-6'>Total : Rs. {finalPrice.toFixed(2)}</p>
          </div>
        </div>
        {addedToCart ? (
          <span className="alert alert-success" role="alert">
            Added to Cart!
          </span>
        ) : (
          <button className='btn btn-primary' onClick={handleAddToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default FoodDataCard;
