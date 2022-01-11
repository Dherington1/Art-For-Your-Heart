import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import './ShopCategories.css'

const ShopCategories = () => {
  return (
    <div>
      <Container>

        <h3>SHOP BY CATEGORY</h3>

        <Row>
          <Col>
            <img className='category-img' src='/images/art-therapy-mc-inline-201016-05.jpeg' alt='adult-art' />
          </Col>
          <Col>
            <img className='category-img' src='/images/happy-kids-doing-arts-crafts-together-DIY-Kids-Crafts-ss-Feature.jpeg' alt='kid-art' />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ShopCategories
