import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Products = (props) => {
    const { img, name, seller, price, stock, key } = props.product;
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h3><Link to={"/product/" + key}>{name}</Link></h3>
                <br />
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart && <button onClick={() => props.handleAddProduct(props.product)}
                    className="add-button">
                    <FontAwesomeIcon icon={faShoppingCart} />add to cart</button>}
            </div>
        </div>
    );
};

export default Products;