import React from "react";
// import ProductList from "../components/ProductList";
// import CategoryMenu from "../components/CategoryMenu";
// import Cart from "../components/Cart";
import Hero from "../components/Hero/Hero";
import ShopCategories from "../components/ShopCategories/ShopCategories";
import ShopFav from "../components/ShopFav/ShopFav";


const Home = () => {
  return (
    <div className="container">
      <Hero />
      <ShopCategories />
      <ShopFav />

      {/* <CategoryMenu />
      <ProductList /> */}
      {/* <Cart /> */}
    </div>
  );
};

export default Home;
