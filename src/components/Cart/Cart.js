import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce((total, prd) => total + prd.price, 0);

    //reduce Simitlar to this code
    // let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const element = cart[i];
    //     total = total + element.price;
    // }
    let tax = 0;
    const shipping = cart.reduce((shipping, product) => shipping + product.shipping, 0)
    tax = (total / 10);
    const totalPrice = total + shipping + tax;

    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: {total.toFixed(2)}</p>
            <p>Shipping: {shipping.toFixed(2)}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <p>Total Price: {totalPrice.toFixed(2)}</p>
        </div >
    );
};

export default Cart;