import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
// import {
//   Card,
//   Button
// } from 'reactstrap';
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
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img alt={name} src={`/images/${image}`} />
        <p>{name}</p>
      </Link>
      <div>
      
        <span>${price}</span>
      </div>
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
  // return (
  //   <div>
  //       <Card style={{ width: '18rem' }}>
  //         <Link to={`/products/${_id}`}>
  //           <Card.Img variant="top" src="holder.js/100px180" />
  //         </Link>
  //         <Card.Body>
  //           <Link to={`/products/${_id}`}>
  //             <Card.Title>{item.title}</Card.Title>
  //           </Link>
  //           <Card.Text>
  //             <span>${price}</span>
  //           </Card.Text>
  //           <Button onClick={addToCart} variant="primary">Add to cart </Button>
  //         </Card.Body>
  //       </Card>
  //   </div>
  // )
}

export default ShopFavCards
