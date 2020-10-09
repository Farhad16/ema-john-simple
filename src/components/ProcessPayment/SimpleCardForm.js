import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import React, { useState } from 'react';

const SimpleCardForm = ({ handlePayment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentError, setPaymentError] = useState();
    const [paymentSuccess, setPaymentSuccess] = useState();


    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const cardElement = elements.getElement(CardElement);

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            setPaymentError(error.message);
            setPaymentSuccess(null);
        } else {
            setPaymentSuccess(paymentMethod.id)
            handlePayment(paymentMethod.id)
            setPaymentError(null);
            console.log('[PaymentMethod]', paymentMethod);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button type="submit" disabled={!stripe}>
                    Pay
                </button>
            </form>
            {
                paymentError && <p style={{ color: 'red' }}>{paymentError}</p>
            }
            {
                paymentSuccess && <p style={{ color: 'green' }}>Your payment was successful</p>
            }
        </div>
    );
};

export default SimpleCardForm;