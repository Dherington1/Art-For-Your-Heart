import React from "react";
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

function NavBar() {

  
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Art for your heart </NavbarBrand>
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">HOME</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  SHOP
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    <Link to='/login'>
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
                <NavLink href="/" onClick={() => Auth.logout()}>Logout</NavLink>
            </Nav>
          </Collapse>
        </Navbar>
      );
    } else {
      return (
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Art for your heart </NavbarBrand>
          <NavbarToggler  />
          <Collapse navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">HOME</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  SHOP
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Link to='/login'>
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
                <NavLink href="/signup" >REGISTER</NavLink>
                <NavLink href="/login">LOGIN</NavLink>
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
