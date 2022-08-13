import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import './ShopCategories.css'
import { Link } from 'react-router-dom';

const ShopCategories = () => {
  return (
    <div>
      <Container className='container-category'>

        <h3>SHOP BY CATEGORY</h3>

        <Row>
          <Col sm={12} md={6}>
            <figure class="textcenter">
              <img className='category-img' src='/images/art-therapy-mc-inline-201016-05.jpeg' alt='kid-art' /> 
              <figcaption className='fig'>
                <Link to='/professional'>
                  <button>Professional Art</button>
                </Link>
              </figcaption>
            </figure>
          </Col>

          <Col sm={12} md={6}>
            <figure class="textcenter">
              <img className='category-img' src='/images/happy-kids-doing-arts-crafts-together-DIY-Kids-Crafts-ss-Feature.jpeg' alt='kid-art' /> 
              <figcaption>
                <Link to='/kids'>
                  <button>Kids Art</button>
                </Link>
              </figcaption>
            </figure>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ShopCategories
