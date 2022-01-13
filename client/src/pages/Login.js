import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import './login.css'
import {Link} from 'react-router-dom'
import Cart from '../components/Cart/index'

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
       <form class="login-form" onSubmit={handleFormSubmit}>
            <div class="login-form__content">
                <div class="login-form__header">Login to your account</div>
                <input class="login-form__input" type="text" name="dc_username" 
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                 />
                <input class="login-form__input" type="password" name="dc_username" placeholder="Password" 
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
                <button class="login-form__button" type="submit">Login</button>
                
                <Link to='/register'>
                  <div class="login-form__links">
                      <a class="login-form__link" href="/signup">Register</a>
                  </div>
                </Link>

                {error ? (
                  <div>
                    <p className="error-text">The provided credentials are incorrect</p>
                  </div>
                ) : null}

            </div>
        </form>
        <Cart />
    </div>
  );
}

export default Login;
