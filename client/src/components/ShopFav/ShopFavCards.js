import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Col
} from 'reactstrap';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


const ShopFavCards = (item) => {


  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { image, name, _id, price } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find(cartItem => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  return (
    <Col xs={6} sm={4} md={4}>
      <div className="card ">
        <Link to={`/products/${_id}`}>
          <img alt={name} src={`/images/${image}`} />
        </Link>
          <p className='product-name'>{name}</p>
        <div className='product-price'>
          <span>${price}</span>
        </div>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </Col>
  );

}

export default ShopFavCards
