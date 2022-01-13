import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Col, 
  Row,
  Card
} from 'reactstrap';
import Cart from "../components/Cart";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import './Details.css'


function Detail() {
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach(product => {
        idbPromise("products", "put", product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise("products", "get").then(indexedProducts => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find(cartItem => cartItem._id === id);
    // if the item is in the cart update the quantity
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + quantity,
      });
      console.log(quantity)
    } 
    // if its not in the cart add it
    else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: quantity },
      });
      idbPromise("cart", "put", { ...currentProduct, purchaseQuantity: quantity });
      console.log(quantity)
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise("cart", "delete", { ...currentProduct });
  };

  const handleQuantity = (e) => {
    // value is equal to our quantity number
    const value = e.target.value;
    // set that number to our useState
    setQuantity(value);
  
  }

  return (
    <>

      <Container className="detail-container">
        <Row>
          <div className="link-to-home">
            <Link to='/'>Home</Link> / {currentProduct.name}
          </div>
          {/* left column */}
          <Col>
          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
          </Col>
          {/* right column */}
          <Col>
          <div className="name">
            {currentProduct.name}
          </div>

          <div className="price">
           $ {currentProduct.price}
          </div>

          <div className="quantity">
            Quantity
          </div>
          <div className="input">
            <input className="inputBox" type='number' value={quantity} onChange={handleQuantity}/>
          </div>
          <div className="toCart">
            <button className="toCartBtn" onClick={addToCart}>Add to Cart</button>
          </div>
          
          <div >
            <p className="productInfo">Product info</p>
          </div>
          <div>
            <p>{currentProduct.description}</p>
          </div>

          </Col>
        </Row>
      </Container>
    <Cart />


{/* 

      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>$ {currentProduct.price}{" "}
            <button onClick={addToCart}>Add to Cart</button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      <Cart /> */}
    </>
  );
}

export default Detail;
