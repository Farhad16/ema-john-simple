import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';

const stripePromise = loadStripe('pk_test_51HZwlAHxQZgLoFKY91Oo1diTgWEcApFUrFeYyoEU9BkG8CMsKNPAEHWFfCWBLkTpJBrI68loiNlPgRkwwzWyon8J007XTA8yab');

const ProcessPayment = ({ handlePayment }) => {
    return (
        <Elements stripe={stripePromise}>
            <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
        </Elements>
    );
};

export default ProcessPayment;