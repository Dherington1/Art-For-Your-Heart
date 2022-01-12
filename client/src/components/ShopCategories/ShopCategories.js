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
      <Container>

        <h3>SHOP BY CATEGORY</h3>

        <Row>
          <Col>
            <Link to = "/professional"><img className='category-img' src='/images/art-therapy-mc-inline-201016-05.jpeg' alt='adult-art' />
            <figcaption>Professional Art</figcaption></Link> 
          </Col>
          <Col>
          <Link to = "/kids"><img className='category-img' src='/images/happy-kids-doing-arts-crafts-together-DIY-Kids-Crafts-ss-Feature.jpeg' alt='kid-art' />
            <figcaption>Kids Art</figcaption></Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ShopCategories
