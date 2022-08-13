import Auth from "../../utils/auth";
import './index.css'
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { TOGGLE_CART, } from "../../utils/actions";
import { useState } from "react";



import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Collapse from 'react-bootstrap/Collapse';
import Card from 'react-bootstrap/Card';


import Cart from "../Cart";

function NavBarCom() {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach(category => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then(categories => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    console.log(id)
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
    console.log('clicked');
  }

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Navbar bg="light" expand="sm">
        <Navbar.Brand href="/" id='title'>ART FOR YOUR HEART</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav
            navbarScroll
            className=" justify-content-end" navbar style={{ width: "99%" }}
          >
            <Nav.Link href="/">HOME</Nav.Link>
            <NavDropdown title="SHOP" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/professional">
              PROFESSIONAL ART
              </NavDropdown.Item>
              <NavDropdown.Item href="/kids">
                KIDS ART
              </NavDropdown.Item>
            </NavDropdown>
              <Nav.Link href="/" onClick={() => Auth.logout()}>LOGOUT</Nav.Link>
              <Nav.Link href="/Cart" id='cart'><i className="fas fa-shopping-cart"></i></Nav.Link>
          </Nav>
         
        </Navbar.Collapse>
      </Navbar>
      )
    } else {
      return (
        <Navbar bg="light" expand="md">
        <Navbar.Brand href="/" id='title'>ART FOR YOUR HEART</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav
            navbarScroll
            className=" justify-content-end" navbar style={{ width: "99%" }}
          >
            <Nav.Link href="/">HOME</Nav.Link>
            <NavDropdown title="SHOP" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/professional">
              PROFESSIONAL ART
              </NavDropdown.Item>
              <NavDropdown.Item href="/kids">
                KIDS ART
              </NavDropdown.Item>
            </NavDropdown>
              <Nav.Link href="/login">LOGIN</Nav.Link>
              <Nav.Link href="/Cart"  id='cart'><i className="fas fa-shopping-cart"></i></Nav.Link>
          </Nav>
         
        </Navbar.Collapse>
      </Navbar>
      )
    }
  }



 return (
    <div>
      {showNavigation()}
    </div>
  );
}
export default NavBarCom;
 