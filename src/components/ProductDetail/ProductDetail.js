import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import Product from '../Products/Products'
import { Spinner } from 'react-bootstrap';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`https://limitless-sands-03516.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setIsLoading(false)
            })
    }, [productKey])
    // const product = fakeData.find(pk => pk.key === productKey);

    console.log(product);
    return (
        <div className="product-details">
            <h1>Product Details</h1>
            {
                isLoading ? <div className="loading">
                    <p>Loading...</p>
                    <Spinner animation="border" />
                </div> :
                    product && <Product showAddToCart={false} product={product}></Product>
            }
        </div >
    );
};

export default ProductDetail;