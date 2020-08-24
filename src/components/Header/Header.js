import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Header = (props) => {
    const cart = props.cart;
    console.log(cart);
    // console.log(totalCart.length);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav className="navber">
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
                <span className="cart"><FontAwesomeIcon icon={faShoppingCart} /></span>
            </nav>
        </div>
    );
};

export default Header;