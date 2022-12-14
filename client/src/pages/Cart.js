import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/react-hooks";
import { QUERY_CHECKOUT } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import CartItem from "../components/CartItem/index";
import Auth from "../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../utils/actions";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import '../index.css'
import {
    Container,
    Col, 
    Row,
    Card
  } from 'reactstrap';
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");




const Cart = () => {
    const state = useSelector(state => state);
    const dispatch = useDispatch();
 
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    useEffect(() => {
        if (data) {
          stripePromise.then(res => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
          });
        }
    }, [data]);

    useEffect(() => {
        async function getCart() {
          const cart = await idbPromise("cart", "get");
          dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }
    
        if (!state.cart.length) {
          getCart();
        }
    }, [state.cart.length, dispatch]);

    function calculateTotal() {
        let sum = 0;
        state.cart.forEach(item => {
          sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }


    function submitCheckout() {
        const productIds = [];
    
        state.cart.forEach(item => {
          for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
          }
        });
    
        getCheckout({
          variables: { products: productIds },
        });
    }

  return (
    <div >

    <h2 className="cart-title">Shopping Cart</h2>
    {state.cart.length ? (
      <div>
        {state.cart.map(item => (
          <CartItem key={item._id} item={item} />
        ))}

        <div className="cart-total">
          <strong>Total: $ {calculateTotal()}</strong>

          {Auth.loggedIn() ? (
            <>
              <button onClick={submitCheckout}>Checkout</button>
              
            </>
          ) : (
            <Link to='/login'>
              <span >(log in to check out)</span>
            </Link>
          )}
        </div>
      </div>
    ) : (
    
      <>
        <p>Your cart is currently empty</p>
      </>
    )}
  </div>
  )
}

export default Cart