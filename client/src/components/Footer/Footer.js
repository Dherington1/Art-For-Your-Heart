import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Col,
  Row,
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './Footer.css'


const Footer = () => {
  return (
    
    <Container className='footer-container'>
      <Row className='footer-row'>
        {/* left */}
        <Col className='left'>
          <h2>OUR NEWSLETTER</h2>
          <p className='newsLetter-p'>Subscribe to our newsletter to receive special offers and updates on new products</p>
          {/* <p>Email *</p> */}
          <input className='input-box' placeholder='Email *' type="email" />
          <div>
          <button className='footer-button'>Subscribe</button>
          </div>
        </Col>
        {/* middle */}
        <Col className='middle'>
          <h2>SHOP</h2>

          <p>
            <Link to='/professional'> Shop Professional Art</Link>
          </p>
          <p>
            <Link to='/kids'>Shop Kids Art</Link>
          </p>
          <p>
            <Link to='/'>Shipping & Returns</Link>
          </p>
          <p>
            <Link to='/'>Store Policy</Link>
          </p>
          <p>
            <Link to='/'>Store Policy</Link>
          </p>
          <p>
            <Link to='/'>FAQ</Link>
          </p>
        </Col>
        {/* right */}
        <Col>
          <h2>CONTACT</h2>
          <p>7000 Coliseum Way, Oakland, CA 94621</p>
          <p>info@mysite.com</p>
          <p> 123-456-7890</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
