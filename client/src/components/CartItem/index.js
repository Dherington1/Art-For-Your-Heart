import React from "react";
import './index.css'
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import { useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Col
} from 'reactstrap';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = e => {
    const value = e.target.value;
    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  return (


    <Container >
      <Row>
        {/* img */}
        <Col md={6}>
          <div className="product-img">
            <img  src={`/images/${item.image}`} alt="item" />
          </div>
        </Col>
        {/* price , quantity */}
        <Col xs={8} md={6}>
          <div className="name">
          {item.name}
          </div>
          <div className="price">
           $ {item.price}
          </div>
          <div className="qty">
            <span>Qty: </span>
            <input
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
              className='removeFromCart'
            />
            <span
              role="img"
              aria-label="trash"
              onClick={() => removeFromCart(item)}
              className='remove-logo'
            >
              ✕
            </span>
          </div>
        </Col>
      </Row>


    </Container>


  );
};

export default CartItem;
