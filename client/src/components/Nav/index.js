import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
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


function NavBar() {

  const state = useSelector(state => state);
  const dispatch = useDispatch();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

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
  }
  
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">ART FOR YOUR HEART</NavbarBrand>
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className=" justify-content-end" navbar style={{ width: "100%" }}>
              <NavItem>
                <NavLink href="/">HOME</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  SHOP
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to='/professional'>
                      PROFESSIONAL ART
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                    <Link to='/kids'>
                      KIDS ART
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavLink href="/" onClick={() => Auth.logout()}>LOGOUT</NavLink>
                <NavLink onClick={toggleCart}><i class="fas fa-shopping-cart"></i></NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">ART FOR YOUR HEART </NavbarBrand>
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className=" justify-content-end" navbar style={{ width: "100%" }}>
              <NavItem>
                <NavLink href="/">HOME</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  SHOP
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Link to='/professional'>
                      PROFESSIONAL ART
                    </Link>
                  </DropdownItem>
                  <DropdownItem>
                  <Link to='/kids' onClick={() => {
                        handleClick(categories[0]._id);
                      }}>
                      KIDS ART
                    </Link>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavLink href="/register" >REGISTER</NavLink>
                <NavLink href="/login">LOGIN</NavLink>
                 <NavLink onClick={toggleCart}><i class="fas fa-shopping-cart"></i></NavLink>
              
            </Nav>

          </Collapse>
        </Navbar>
     
      );
    }
 
  }

  return (
      <div>
        {showNavigation()}
      </div>
    );
}

export default NavBar;
