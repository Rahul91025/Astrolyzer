import React from 'react';
import CheckoutPage from '../../components/CheckoutPage';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Planet from '../../components/Planet';

const Billing = () => {
    return (
        <>
            <Navbar />
            <Planet title="Billing" />
            <CheckoutPage />
            <Footer/>
        </>
    )
}
export default Billing;