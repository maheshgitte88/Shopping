/*
 *
 * Order actions
 *
 */

import { push } from 'connected-react-router';
import axios from 'axios';
import { success } from 'react-notification-system-redux';

import {
  FETCH_ORDERS,
  FETCH_SEARCHED_ORDERS,
  FETCH_ORDER,
  UPDATE_ORDER_STATUS,
  SET_ORDERS_LOADING,
  SET_ADVANCED_FILTERS,
  CLEAR_ORDERS,
  FETCH_ADDRESS
} from './constants';
import React from 'react';
import { clearCart, getCartId } from '../Cart/actions';
import { toggleCart } from '../Navigation/actions';
import {addAddress, fetchAddresses} from '../Address/actions'
import handleError from '../../utils/error';
import { useState } from 'react';
import { Modal } from 'reactstrap';
import { setMessages } from 'validatorjs';

export const updateOrderStatus = value => {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: value
  };
};

export const setOrderLoading = value => {
  return {
    type: SET_ORDERS_LOADING,
    payload: value
  };
};

export const fetchOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order`, {
        params: {
          page: page ?? 1,
          limit: 20
        }
      });

      const { orders, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count }
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchAccountOrders = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order/me`, {
        params: {
          page: page ?? 1,
          limit: 20
        }
      });

      const { orders, totalPages, currentPage, count } = response.data;

      dispatch({
        type: FETCH_ORDERS,
        payload: orders
      });

      dispatch({
        type: SET_ADVANCED_FILTERS,
        payload: { totalPages, currentPage, count }
      });
    } catch (error) {
      dispatch(clearOrders());
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const searchOrders = filter => {
  return async (dispatch, getState) => {
    try {
      dispatch(setOrderLoading(true));

      const response = await axios.get(`/api/order/search`, {
        params: {
          search: filter.value
        }
      });

      dispatch({
        type: FETCH_SEARCHED_ORDERS,
        payload: response.data.orders
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      dispatch(setOrderLoading(false));
    }
  };
};

export const fetchOrder = (id, withLoading = true) => {
  return async (dispatch, getState) => {
    try {
      if (withLoading) {
        dispatch(setOrderLoading(true));
      }

      const response = await axios.get(`/api/order/${id}`);
console.log(response , 139)
      dispatch({
        type: FETCH_ORDER,
        payload: response.data.order
      });
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      if (withLoading) {
        dispatch(setOrderLoading(false));
      }
    }
  };
};

export const cancelOrder = () => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      await axios.delete(`/api/order/cancel/${order._id}`);

      dispatch(push(`/dashboard/orders`));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const updateOrderItemStatus = (itemId, status) => {
  return async (dispatch, getState) => {
    try {
      const order = getState().order.order;

      const response = await axios.put(`/api/order/status/item/${itemId}`, {
        orderId: order._id,
        cartId: order.cartId,
        status
      });

      if (response.data.orderCancelled) {
        dispatch(push(`/dashboard/orders`));
      } else {
        dispatch(updateOrderStatus({ itemId, status }));
        dispatch(fetchOrder(order._id, false));
      }

      const successfulOptions = {
        title: `${response.data.message}`,
        position: 'tr',
        autoDismiss: 1
      };

      dispatch(success(successfulOptions));
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};

export const addOrder = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;
      const address =getState().address.addresses;
      console.log(address ,205)
      if (cartId) {
        const response = await axios.post(`/api/order/add`, {
          cartId,
          total,
          address
        });

        // dispatch(push(`/order/success/${response.data.order._id}`));
        dispatch(clearCart());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};
export const addOrderCashOn = () => {
  return async (dispatch, getState) => {
    try {
      const cartId = localStorage.getItem('cart_id');
      const total = getState().cart.cartTotal;
      console.log(total, 227)
      if (cartId) {
        const response = await axios.post(`/api/order/add`, {
          cartId,
          total,
        });
        dispatch(push(`/order/success/${response.data.order._id}`));
        dispatch(clearCart());
      }
    } catch (error) {
      handleError(error, dispatch);
    }
  };
};


// export const paymentCheckOut =  () => {
//   return (dispatch, getState) => {
//     const token = localStorage.getItem('token');
//     const cartItems = getState().cart.cartItems;
//     console.log(cartItems, 227);
//     if (token && cartItems.length > 0) {

//       Promise.all([dispatch(getCartId())]).then(() => {
//         dispatch(addOrder());
//       });
//     }
//     dispatch(toggleCart());
//   };
// };



export const placeOrder =  () => {
  return (dispatch, getState) => {
    const token = localStorage.getItem('token');
    const cartItems = getState().cart.cartItems;
    // const total = getState().cart.cartTotal;

    if (token && cartItems.length > 0) {
      fetch("http://localhost:3000/api/order/create-checkout-session", {
        method:"post",
        headers:{
          "Content-type":"application/json"
        },
        mode:"cors",
        body: JSON.stringify({cartItems
        })
      })
      .then(async res =>{
        if(res.ok) return res.json()
        const json = await res.json();
        return await Promise.reject(json);
      })
      .then(({url}) => {
        window.location=url;
      })
      .catch(e=>{
        console.log(e.error)
      })
      Promise.all([dispatch(getCartId())]).then(() => {
        dispatch(addOrder());
      });
    }
    dispatch(toggleCart());
  };
};



// export const placeOrderCashOn =  () => {
//   return (dispatch, getState) => {
//     const token = localStorage.getItem('token');
//     const cartItems = getState().cart.cartItems;
//     if (token && cartItems.length > 0) {
//       Promise.all([dispatch(getCartId())]).then(() => {
//         dispatch(addOrderCashOn());
//       });
//     }
//     dispatch(toggleCart());
//   };
// };


// export const placeOrder = (selectedPaymentMode) => {
//   return (dispatch, getState) => {
//     const token = localStorage.getItem('token');

//     const cartItems = getState().cart.cartItems;
//     if (token && cartItems.length > 0) {
//       // Dispatch an action to save the selected payment mode in the store
//       dispatch(saveSelectedPaymentMode(selectedPaymentMode));

//       // Navigate to the payment selection page
//       dispatch(push('/order/paymentmode'));
//     }

//     dispatch(toggleCart());
//   };
// };



export const clearOrders = () => {
  return {
    type: CLEAR_ORDERS
  };
};
