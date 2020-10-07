import React, { useState } from 'react';
import './Shop.css';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from 'react-bootstrap';


const Shop = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])


    useEffect(() => {
        fetch('https://limitless-sands-03516.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setIsLoading(false)
            })
    }, [])
    //Load cart 
    useEffect(() => {
        const getSavedProduct = getDatabaseCart();
        const productKeys = Object.keys(getSavedProduct);
        fetch('https://limitless-sands-03516.herokuapp.com/productByKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productKeys)
        })
            .then(res => res.json())
            .then(data => setCart(data))
    }, [])

    //Set product quantity when product is added
    const handleAddProduct = (product) => {
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct]
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }


    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    isLoading ? <div className="loading">
                        <p>Loading...</p>
                        <Spinner animation="border" />
                    </div> :
                        products.map(product => <Products product={product} key={product.key} handleAddProduct={handleAddProduct} showAddToCart={true}></Products>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to="/review"><button className="add-button">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;