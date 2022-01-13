import React from "react";
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


    <Container>
      <Row>
        {/* img */}
        <Col>
          <img className="cart-img" src={`/images/${item.image}`} alt="item" />
        </Col>
        {/* price , quantity */}
        <Col xs={8}>
          <div>
          {item.name}
          </div>
          <div>
           $ {item.price}
          </div>
          <div>
            <span>Qty: </span>
            <input
              // type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
            />
            <span
              role="img"
              aria-label="trash"
              onClick={() => removeFromCart(item)}
            >
              ✕
            </span>
          </div>
        </Col>
      </Row>


    </Container>






    // <div className="flex-row">
    //   <div>
    //     <img src={`/images/${item.image}`} alt="" />
    //   </div>
    //   <div>
    //     <div>
    //       {item.name}, $ {item.price}
    //     </div>
    //     <div>
    //       <span>Qty:</span>
    //       <input
    //         type="number"
    //         placeholder="1"
    //         value={item.purchaseQuantity}
    //         onChange={onChange}
    //       />
    //       <span
    //         role="img"
    //         aria-label="trash"
    //         onClick={() => removeFromCart(item)}
    //       >
    //         🗑️
    //       </span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default CartItem;
