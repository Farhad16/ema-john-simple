import React, { useContext } from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav className="navber">
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>

                <button onClick={() => setLoggedInUser({})}>Sign Out</button>


                <span className="cartLogo"><FontAwesomeIcon icon={faShoppingCart} /></span>
            </nav>
        </div>
    );
};

export default Header;