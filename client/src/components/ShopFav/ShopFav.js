import React, { useEffect } from 'react'
import ShopFavCards from './ShopFavCards'
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCTS } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";




const ShopFav = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { currentCategory } = state;
  // const currentCategory = 'Food';

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach(product => {
        idbPromise("products", "put", product);
      });
    } else if (!loading) {
      idbPromise("products", "get").then(products => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      product => product.category._id === currentCategory
    );
  }
  return (
    <div>
      <h3>SHOP FAVORITES</h3>
      {/* filter through the products that have the new selected category */}
      {/* {filterProducts().map(product => (
        <ShopFavCards
          key={product._id}
          _id={product._id}
          image={product.image}
          name={product.name}
          price={product.price}
          quantity={product.quantity}
        />
      ))} */}


      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map(product => (
            <ShopFavCards
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
    </div>
  )
}

export default ShopFav
