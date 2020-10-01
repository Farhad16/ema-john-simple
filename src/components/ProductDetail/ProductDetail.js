import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';
import Product from '../Products/Products'

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])
    // const product = fakeData.find(pk => pk.key === productKey);

    console.log(product);
    return (
        <div className="product-details">
            <h1>Product Details</h1>
            {product && <Product showAddToCart={false} product={product}></Product>}
        </div >
    );
};

export default ProductDetail;