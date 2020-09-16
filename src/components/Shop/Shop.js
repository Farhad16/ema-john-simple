import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const Shop = () => {
    const frist10 = fakeData.slice(0, 10);
    const [products] = useState(frist10);
    const [cart, setCart] = useState([])

    //Load cart 
    useEffect(() => {
        const getSavedProduct = getDatabaseCart();
        const productKeys = Object.keys(getSavedProduct);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pdk => pdk.key === key);
            product.quantity = getSavedProduct[key];
            return product;
        });

        setCart(cartProducts);
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
                    products.map(product => <Products product={product} key={product.key} handleAddProduct={handleAddProduct} showAddToCart={true}></Products>)
                }
            </div>
            <div className="card-container">
                <Cart cart={cart}>
                    <Link to="/history"><button className="add-button">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;