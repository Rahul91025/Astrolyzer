import React from 'react';
import Navbar from '../../components/layout/Navbar';
import FAQAccordion from '../../components/features/FAQAccordion';
import Planet from '../../components/features/Planet';
import Footer from '../../components/layout/Footer';

const Page = () => {
    return (
        <>
            <Navbar />
            <Planet title="FAQs" />
            <FAQAccordion />
            <Footer />


        </>
    )
}
export default Page;