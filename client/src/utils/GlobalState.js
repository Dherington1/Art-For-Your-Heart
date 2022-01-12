import React, { createContext, useContext } from "react";
// from reducer
import { useProductReducer } from './reducers';

// instantiate the global state object:
const StoreContext = createContext();
const { Provider } = StoreContext;

// this will store our global props 
const StoreProvider = ({ value = [], ...props }) => {
  // dispatch is the method we execute to update our state
  const [state, dispatch] = useProductReducer({
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: ''
  });
  // use this to confirm it works!
  console.log(state);
  return <Provider value={[state, dispatch]} {...props} />;
};

// allow access to global props
const useStoreContext = () => {
  return useContext(StoreContext);
};




export { StoreProvider, useStoreContext };