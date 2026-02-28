import React from 'react';
import Navbar from '../../components/Navbar';
import FAQAccordion from '../../components/FAQAccordion';
import Planet from '../../components/Planet';
import Footer from '../../components/Footer';

const Page = () => {
    return (
        <>
            <Navbar />
            <Planet title="FAQs" />
            <FAQAccordion />
            <Footer/>
            
            
        </>
    )
}
export default Page;