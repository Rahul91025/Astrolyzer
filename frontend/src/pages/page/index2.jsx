import React from 'react';
import CheckoutPage from '../../components/features/CheckoutPage';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Planet from '../../components/features/Planet';

const Billing = () => {
    return (
        <>
            <Navbar />
            <Planet title="Billing" />
            <CheckoutPage />
            <Footer />
        </>
    )
}
export default Billing;