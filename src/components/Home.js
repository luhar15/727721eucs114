import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4MzUzNzgwLCJpYXQiOjE3MTgzNTM0ODAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjMzZjY4NTVhLWQ2YTktNGY1Mi1hYzMyLWM4MTc4ZDY4YTIxYSIsInN1YiI6ImdvY2FydEBhYmMuZWR1In0sImNvbXBhbnlOYW1lIjoiZ29jYXJ0IiwiY2xpZW50SUQiOiIzM2Y2ODU1YS1kNmE5LTRmNTItYWMzMi1jODE3OGQ2OGEyMWEiLCJjbGllbnRTZWNyZXQiOiJsZ2NLS2ROV2JIemRQTFFGIiwib3duZXJOYW1lIjoiUmFodWwiLCJvd25lckVtYWlsIjoiZ29jYXJ0QGFiYy5lZHUiLCJyb2xsTm8iOiIxIn0.4KKBU271Hm3yKH_X_DZtsB4icAHN-CfaoZY8n9VQsOU'; // Replace with your actual token

    useEffect(() => {
        axios.get('http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Data fetched successfully:', response.data);
            setProducts(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
            setError(error.message || 'Unknown error');
        });
    }, [token]);

    return (
        <>
            <div className="nav"></div>
            <div className="box">
                <div className="content">
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    {products.length === 0 && !error ? (
                        <p>Loading products...</p>
                    ) : (
                        products.map((product, index) => (
                            <div className="card" key={index}>
                                <img src={product.image || 'https://via.placeholder.com/150'} alt={product.name} className="product-image" />
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">${product.price}</p>
                                    <p className="product-rating">Rating: {product.rating}</p>
                                    <p className="product-discount">Discount: {product.discount}%</p>
                                    <p className="product-availability">Availability: {product.availability}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
