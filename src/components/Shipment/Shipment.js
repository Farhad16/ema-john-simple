import React from 'react';
import { useForm } from "react-hook-form";
import './Shipment.css'
import { useContext } from 'react';
import { UserContext } from '../../App';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("name")); // watch input value by passing the name of it

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