
import React from 'react'
import List from '../Address/List'
import { useState } from 'react';

export default  function PaymentMode({ onSubmit }) {
    const [paymentMode, setPaymentMode] = useState('cash-on-delivery');

    const handlePaymentModeChange = (event) => {
      setPaymentMode(event.target.value);
    };
  
    const  handleSubmit = (event) => {
      event.preventDefault();
      onSubmit(paymentMode);
    };
  
    return (
      <div className="container">
        <div className="row justify-content-center">
        <div className="col-md-8">
        <div className="card">
            <List />
        </div>
        </div>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Select Payment Mode</div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMode"
                        id="cashOnDelivery"
                        value="cash-on-delivery"
                        checked={paymentMode === 'cash-on-delivery'}
                        onChange={handlePaymentModeChange}
                      />
                      <label className="form-check-label" htmlFor="cashOnDelivery">
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMode"
                        id="paymentGateway"
                        value="payment-gateway"
                        checked={paymentMode === 'payment-gateway'}
                        onChange={handlePaymentModeChange}
                      />
                      <label className="form-check-label" htmlFor="paymentGateway">
                        Pay With INR
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMode"
                        id="wallet"
                        value="wallet"
                        checked={paymentMode === 'wallet'}
                        onChange={handlePaymentModeChange}
                      />
                      <label className="form-check-label" htmlFor="wallet">
                        Reedem Points
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  