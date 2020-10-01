import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart'
import './Review.css'
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {

    const history = useHistory();
    const [cart, setCart] = useState([]);

    //state for set order placed
    const [orderPlaced, setOrderPlaced] = useState(false);

    //load cart from localstorage and set quantity
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const cartKey = Object.keys(savedCart);

        fetch('http://localhost:5000/productByKey', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cartKey)
        })
            .then(res => res.json())
            .then(data => setCart(data))

    }, []);
    const countProduct = cart.reduce((sum, product) => sum + product.quantity, 0)

    const handleRemoveProduct = (key) => {
        const newCart = cart.filter(pd => pd.key !== key);
        setCart(newCart)
        removeFromDatabaseCart(key)
    };

    const handleProceedCheckout = () => {
        history.push('/shipment')
    };

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImage} alt="" />
    }

    return (
        <div className="review-container">
            <div className="review">
                <h1>Total product {countProduct}</h1>
                {
                    cart.map(pd => <ReviewItem product={pd} key={pd.key} handleRemoveProduct={handleRemoveProduct}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="add-button" onClick={handleProceedCheckout} >Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;