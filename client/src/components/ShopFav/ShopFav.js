import React, { useEffect, useState } from 'react'
import ShopFavCards from './ShopFavCards'
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCTS } from "../../utils/queries";

import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Col
} from 'reactstrap';


const ShopFav = () => {
  
  const [products, setProducts] = useState([])  
  const [search, setSearch] = useState('62f7398930933741203d623b')

  // grab our data from the query 
  const {data: categoryData} = useQuery(QUERY_PRODUCTS, {
    variables: {
      // run our id so its hard coded
      category: search
    }
  })

  useEffect(()=> {
    // if category data is there and its bigger than 0 
    if(categoryData && categoryData.products.length > 0){
      // set it to our products
      setProducts(categoryData.products)
    }

  }, [categoryData])


  return (
    <div>
      <h3>SHOP FAVORITES</h3>
     
     <Container>
          <Row>
            {products.map(product => (
                <ShopFavCards
                  key={product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                />
            ))}
          </Row>
      </Container>
    </div>
  )
}

export default ShopFav
