import React, { useState } from "react";
import Button from "../../Common/Button";
import List from "../../../containers/Address/List";
import { push } from 'connected-react-router';

const Checkout = (props) => {
  const { authenticated, handleShopping, placeOrder, handleCheckout,} = props;
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);



  const handlePayment = async () => {
    return new Promise((resolve, reject) => {
      if (selectedPaymentMethod === "wallet") {
        console.log(
          `open Qudex App and pay payment method: ${selectedPaymentMethod}`
        );
        resolve();
      } else if (selectedPaymentMethod === "paymentGateway") {
        console.log("redurected to payment get way");
        placeOrder();
        resolve();
      } else if (selectedPaymentMethod === "cashOnDelivery") {
        console.log("cashOnDelivery order");
        placeOrderCashOn();
        resolve();
      } else {
        console.log("Salect payment method");
     
        resolve();
      }
      // placeOrder();
    });
  };

  const handlePlaceOrder = async () => {
    if (selectedPaymentMethod) {
      await handlePayment();

    } else {
      alert("Please select a payment method before placing the order");
    }
  };

  return (
    <div className="easy-checkout">
      <div className="payment-methods">
        <h3>Order shiped to Your Default Address Salected:</h3>
        <div style={{ height: "100px", width: "450px", paddingBottom:"200px" }}>
          <List />
        </div>

        <h3>Select Payment Method:</h3>
        {/* <div>
          <input
            type="radio"
            name="paymentMethod"
            id="cashOnDelivery"
            value="cashOnDelivery"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          <label htmlFor="cashOnDelivery">Cash on Delivery</label>
        </div> */}
        <div>
          <input
            type="radio"
            name="paymentMethod"
            id="paymentGateway"
            value="paymentGateway"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          <label htmlFor="paymentGateway">Payment Gateway</label>
        </div>
        {/* <div>
          <input
            type="radio"
            name="paymentMethod"
            id="wallet"
            value="wallet"
            onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          />
          <label htmlFor="wallet">Pay with Wallet</label>
        </div> */}
      </div>
      <div className="checkout-actions">
        <Button
          variant="primary"
          text="Continue shopping"
          onClick={() => handleShopping()}
        />
        {authenticated ? (
          <Button
            variant="primary"
            text="Place Order"
            onClick={handlePlaceOrder}
          />
        ) : (
          <Button
            variant="primary"
            text="Proceed To Checkout"
            onClick={() => handleCheckout()}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;

// import React, { useState } from 'react';
// import Button from '../../Common/Button';

// const Checkout = props => {
//   const { authenticated, handleShopping, placeOrder, handleCheckout } = props;
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

//   const handlePayment = (setSelectedPaymentMethod) => {
//     // TODO: Trigger the selected payment method here
//     console.log("payment method trigerrd", 10)
//   };

//   // const handlePlaceOrder = () => {
//   //   // TODO: Place the order here
//   // };

//   return (
//     <div className='easy-checkout'>
//       <div className='checkout-actions'>
//         <Button
//           variant='primary'
//           text='Continue shopping'
//           onClick={handleShopping}
//         />
//         {!authenticated ? (
//           <Button
//             variant='primary'
//             text='Proceed To Checkout'
//             onClick={handleCheckout}
//           />
//         ) : selectedPaymentMethod === null ? (
//           <div>
//             <p>Select a payment method:</p>
//             <Button
//               variant='primary'
//               text='Cash on Delivery'
//               onClick={() => setSelectedPaymentMethod('cash')}
//             />
//             <Button
//               variant='primary'
//               text='Payment Gateway'
//               onClick={() => setSelectedPaymentMethod('gateway')}
//             />
//             <Button
//               variant='primary'
//               text='Pay with Wallet'
//               onClick={() => setSelectedPaymentMethod('wallet')}
//             />
//           </div>
//         ) : (
//           <div>
//             <p>You have selected {selectedPaymentMethod} as your payment method.</p>
//             <Button
//               variant='primary'
//               text='Place Order'
//               onClick={placeOrder}
//             />
//             <Button
//               variant='primary'
//               text='Change Payment Method'
//               onClick={() => setSelectedPaymentMethod(null)}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Checkout;

// /**
//  *
//  * Checkout
//  *
//  */

// import React from 'react';
// import Button from '../../Common/Button';
// const Checkout = props => {
//   const { authenticated, handleShopping, handleCheckout, placeOrder } = props;
//   return (
//     <div className='easy-checkout'>
//       <div className='checkout-actions'>
//         <Button
//           variant='primary'
//           text='Continue shopping'
//           onClick={() => handleShopping()}
//         />
//         {authenticated ? (
//           <Button
//             variant='primary'
//             text='Place Order'
//             onClick={() => placeOrder()}
//           />
//         ) : (
//           <Button
//             variant='primary'
//             text='Proceed To Checkout'
//             onClick={() => handleCheckout()}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
// export default Checkout;
