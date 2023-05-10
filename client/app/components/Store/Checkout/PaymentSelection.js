import React, { useState } from 'react';

const PaymentSelection = ({ onSelect }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleSelect = (method) => {
    setSelectedMethod(method);
    onSelect(method);
  }

  return (
    <div>
      <h2>Select Payment Method:</h2>
      <ul>
        <li>
          <button onClick={() => handleSelect('cash-on-delivery')}>
            Cash on Delivery
          </button>
        </li>
        <li>
          <button onClick={() => handleSelect('payment-gateway')}>
            Payment Gateway
          </button>
        </li>
        <li>
          <button onClick={() => handleSelect('wallet')}>
            Pay with Wallet
          </button>
        </li>
      </ul>
      {selectedMethod && (
        <p>You have selected {selectedMethod} as your payment method.</p>
      )}
    </div>
  );
};

export default PaymentSelection;
