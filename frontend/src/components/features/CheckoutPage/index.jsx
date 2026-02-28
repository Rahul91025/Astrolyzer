import React, { useState, useRef } from 'react';

const CheckoutPage = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const formRef = useRef(null);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      alert("Please enter a valid coupon code.");
      return;
    }
    alert(`Coupon "${couponCode}" applied!`);
    setCouponCode(''); // ✅ Clear coupon input
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    formRef.current?.reset(); // ✅ Reset all input fields
    setCouponCode('');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 max-w-6xl mx-auto font-sans text-[15px] text-gray-900 mt-[5rem]">
      {/* Coupon Banner */}
      <div className="bg-[#f7f6f7] border-l-4 border-orange-500 px-5 py-3 mb-4 text-[#8a6d3b] tracking-wide shadow-sm">
        Have a coupon?{' '}
        <button
          onClick={() => setShowCoupon(true)}
          className="text-orange-500 underline"
        >
          Click Here To Enter Your Code
        </button>
      </div>

      {/* Coupon Input Box */}
      {showCoupon && (
        <div className="border border-gray-300 bg-white px-5 py-4 mb-10 transition-all duration-300 shadow-md grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter your coupon code"
            className="border border-gray-400 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm rounded-none"
          />
          <button
            onClick={handleApplyCoupon}
            className="bg-orange-500 text-white font-semibold px-6 py-2 uppercase text-sm tracking-wide hover:bg-orange-600 transition-all rounded-none"
          >
            Apply Coupon
          </button>
        </div>
      )}

      {/* Billing Details Form */}
      <form ref={formRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: 'First Name' },
          { label: 'Last Name' },
          { label: 'Company Name (Optional)', span: 2 },
          {
            label: 'Country / Region',
            type: 'select',
            options: ['India', 'United States (US)'],
            span: 2,
          },
          {
            label: 'Street Address',
            placeholder1: 'House number and street name',
            placeholder2: 'Apartment, suite, unit, etc. (optional)',
            span: 2,
            double: true,
          },
          { label: 'Town / City', span: 2 },
          {
            label: 'State',
            type: 'select',
            options: ['Odisha', 'California'],
          },
          { label: 'ZIP Code' },
          { label: 'Phone' },
          { label: 'Email Address' },
        ].map((field, index) => {
          const colSpan = field.span === 2 ? 'md:col-span-2' : '';
          return (
            <div key={index} className={`${colSpan}`}>
              <label className="block text-sm font-semibold mb-1">
                {field.label}
                {field.label.toLowerCase().includes('optional') && (
                  <span className="text-gray-500 text-xs ml-1">(Optional)</span>
                )}
              </label>
              {field.double ? (
                <>
                  <input
                    type="text"
                    placeholder={field.placeholder1}
                    className="w-full border border-gray-400 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm rounded-none"
                  />
                  <input
                    type="text"
                    placeholder={field.placeholder2}
                    className="w-full border border-gray-400 px-3 py-2 mt-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm rounded-none"
                  />
                </>
              ) : field.type === 'select' ? (
                <select className="w-full border border-gray-400 px-3 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm rounded-none">
                  {field.options.map((opt, i) => (
                    <option key={i}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || 'text'}
                  className="w-full border border-gray-400 px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm rounded-none"
                />
              )}
            </div>
          );
        })}
      </form>

      {/* Additional Information */}
      <div className="mt-12">
        <h3 className="text-lg font-bold mb-2 tracking-wide">Additional Information</h3>
        <label className="block mb-1">
          Order Notes <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <textarea
          className="w-full border border-gray-400 px-3 py-2 h-28 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm rounded-none"
          placeholder="Notes about your order, e.g. special notes for delivery."
        />
      </div>

      {/* Order Summary */}
      <div className="mt-12 border-t pt-10">
        <h3 className="text-xl font-bold mb-5 uppercase tracking-wide">Your Order</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border border-gray-300 shadow-sm rounded-none">
            <thead>
              <tr className="bg-orange-500 text-white uppercase text-xs tracking-wider">
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white">
                <td className="px-4 py-3 border-t">Gold Crown Treasure × 2</td>
                <td className="px-4 py-3 border-t text-right">$100.00</td>
              </tr>
              <tr className="bg-gray-50 font-semibold">
                <td className="px-4 py-3 border-t">Subtotal</td>
                <td className="px-4 py-3 border-t text-right">$100.00</td>
              </tr>
              <tr className="bg-white font-bold">
                <td className="px-4 py-3 border-t">Total</td>
                <td className="px-4 py-3 border-t text-right">$100.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Method */}
        <div className="mt-6 border border-gray-300 p-4 bg-gray-100 shadow-sm">
          <label className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              defaultChecked
              className="accent-orange-500"
            />
            <span className="font-semibold">Pay by Razorpay</span>
          </label>
          <p className="text-xs text-gray-600 mt-2">
            Pay securely by Credit or Debit card or Internet Banking through Razorpay.
          </p>
        </div>

        {/* Place Order Button */}
        <div className="mt-8">
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold uppercase py-3 transition-all tracking-wider text-sm rounded-none"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
