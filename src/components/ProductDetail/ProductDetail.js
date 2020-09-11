import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import './ProductDetail.css';
import Product from '../Products/Products'

const ProductDetail = () => {
    const { productKey } = useParams();
    const product = fakeData.find(pk => pk.key === productKey);

    console.log(product);
    return (
        <div className="product-details">
            <h1>Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div >
    );
};

export default ProductDetail;