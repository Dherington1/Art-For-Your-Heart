import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser, { error }] = useMutation(ADD_USER);

  if (error) {
    console.log(Object.values(error));
  }
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
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
                <div class="login-form__header">Register for an account</div>
                <input class="login-form__input" type="text" name="dc_username"
                  placeholder="First Name"
                  name="firstName"
                  type="firstName"
                  id="firstName"
                  onChange={handleChange}
                />
                <input class="login-form__input" type="text" name="dc_username"
                  placeholder="Last Name"
                  name="lastName"
                  type="lastName"
                  id="lastName"
                  onChange={handleChange}
                />
                <input class="login-form__input" type="text" name="dc_username" 
                  placeholder="Email"
                  name="email"
                  type="email"
                  id="email"
                  onChange={handleChange}
                 />
                <input class="login-form__input" type="password" name="dc_username" 
                  placeholder="Password" 
                  name="password"
                  type="password"
                  id="pwd"
                  onChange={handleChange}
                />
                <button class="login-form__button" type="submit">Register</button>
                <Link to='/login'>
                  <div class="login-form__links">
                      <a class="login-form__link" href="/">login</a>
                  </div>
                </Link>
              
            </div>
        </form>
    </div>
  );
}

export default Signup;
