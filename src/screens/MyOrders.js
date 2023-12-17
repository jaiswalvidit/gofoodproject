import React, { useEffect, useState } from 'react';
import { IMAGE_URL } from '../constants';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({ email: '', products: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOrder = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');

        const response = await fetch(`http://localhost:8001/api/myOrderData?email=${userEmail}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setOrderData(data.orderData[0] || { email: '', products: [] });
        } else {
          console.error('Fetch failed with status:', response.status);
          setError('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrder();
  }, []);

  // Styles
  const cardStyle = {
    backgroundColor: '#343a40',
    color: 'white',
    padding: '1rem',
    borderRadius: '10px',
    margin: '2px',
  };

  const productCardStyle = {
    backgroundColor: '#ffc107',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  };

  const dateStyle = {
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  };

  return (
    <div style={{ background: 'rgba(255, 255, 0, 0.1)' }}>
      <div className="container my-2">
        <div className="row">
          <div className="col-12">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                {error ? (
                  <div>Error: {error}</div>
                ) : (
                  <ul className="list-unstyled">
                    {orderData.products && orderData.products.length === 0 ? (
                      <li>No product added</li>
                    ) : (
                      orderData.products.map((productGroup, index) => (
                        <li key={index} className="mb-4">
                          <div className="m-2 p-2" style={cardStyle}>
                            {productGroup[0].Order_date && (
                              <div style={dateStyle} className="fs-4">
                                Date: {new Date(productGroup[0].Order_date).toLocaleDateString()} Time:{' '}
                                {new Date(productGroup[0].Order_date).toLocaleTimeString()}
                              </div>
                            )}
                            <ul className="list-unstyled m-3">
                              {productGroup.slice(1).map((product, subIndex) => (
                                <li key={subIndex} className="mb-3">
                                  <div className="rpw" style={productCardStyle}>
                                    <div className="text-start fs-6 col-9">
                                      <p className="text-success font-weight-bold mb-0">
                                        <strong>Name: {product.Name}</strong>
                                      </p>
                                      <p className="text-danger mb-0">
                                        <strong>Price: ₹{product.price / 100}/-</strong>
                                      </p>
                                      <p className="text-dark mb-0">
                                        <strong>Quantity: {product.qty}</strong>
                                      </p>
                                      <p className="text-dark mb-0">
                                        <strong>Description: {product.description}</strong>
                                      </p>
                                    </div>
                                    <div className="text-end col-3 rounded">
                                      <img
                                        src={`${IMAGE_URL}${product.imageId || 'defaultImageId'}`}
                                        alt={`Product ${product.Name}`}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                        className="img-fluid rounded"
                                      />
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
