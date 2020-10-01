import React from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const savedCart = getDatabaseCart();
        const orderDetails = { ...loggedInUser, products: savedCart, shipment: data, orderTime: new Date() }
        fetch('https://limitless-sands-03516.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails)

        }).then(res => res.json())
            .then(data => {
                if (data) {
                    processOrder()
                    alert('Your order placed successfully')
                }
            })
    };



    return (
        < form onSubmit={handleSubmit(onSubmit)} className="ship-form">
            < input name="name" ref={register({ required: true })} defaultValue={loggedInUser.name} placeholder="Your Name" />
            {errors.name && <span>Name is required</span>}
            < input name="email" ref={register({ required: true })} defaultValue={loggedInUser.email} placeholder="Your Email" />
            {errors.email && <span>Email is required</span>}
            < input name="address" ref={register({ required: true })} placeholder="Your Address" />
            {errors.address && <span>Address is required</span>}
            < input name="phone" ref={register({ required: true })} placeholder="Your Phone" />
            {errors.phone && <span>Phone is required</span>}
            <input type="submit" />
        </form >
    );
}

export default Shipment;