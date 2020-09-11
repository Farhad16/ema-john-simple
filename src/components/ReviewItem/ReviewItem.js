import React from 'react';

const ReviewItem = (props) => {

    // console.log(props.product);
    const { name, img, quantity, key, price } = props.product
    return (
        <div className="product">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-name">
                <h4 >{name}</h4>
                <h5>Quantity: {quantity}</h5>
                <p>${price}</p>
                <br />
                <button className="add-button" onClick={() => props.handleRemoveProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;