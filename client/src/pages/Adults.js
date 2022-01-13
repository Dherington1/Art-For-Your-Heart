import { useQuery } from '@apollo/react-hooks';
import React, {useState, useEffect} from 'react'
import { QUERY_PRODUCTS } from "../utils/queries";
import ProductItem from "../components/ProductItem/index";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Col, 
  Row
} from 'reactstrap';
import Cart from "../components/Cart";

const Adults = () => {

  const [products, setProducts] = useState([])  
  const [search, setSearch] =useState('61df5878db560012457b8d52')

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
  
  console.log(categoryData)



  return (
    <div>
      <h3>PROFESSIONAL ART </h3>

          <Container className='shop-container'>
           
              <div className='flex-row'>
              {products.map(product => (
                  <ProductItem
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
          <Cart />
    </div>
  )
}

export default Adults
