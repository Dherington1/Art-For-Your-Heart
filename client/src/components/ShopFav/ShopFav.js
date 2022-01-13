import React, { useEffect, useState } from 'react'
import ShopFavCards from './ShopFavCards'
import { useQuery } from "@apollo/react-hooks";
import { QUERY_PRODUCTS } from "../../utils/queries";

import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row
} from 'reactstrap';


const ShopFav = () => {
  
  const [products, setProducts] = useState([])  
  const [search, setSearch] = useState('61dfa9bfec684320a8b67106')

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
          <div className='flex-row'>
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
            </div>  
        </Container>
     
    </div>
  )
}

export default ShopFav
