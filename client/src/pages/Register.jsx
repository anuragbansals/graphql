// import gql from "graphql-tag";
import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

import { Button, Form } from "semantic-ui-react";

function Register() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      console.log(result);
    },
    onError(error) {
      console.log(error);
      // setErrors(error?.errors[0]?.extensions.code);
    },
    variables: values,
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
        <Form.Input
          label="Username"
          placeholder="Username.."
          name="username"
          value={values.username}
          onChange={onChange}
          type="text"
        />
        <Form.Input
          label="Email"
          placeholder="Email.."
          name="email"
          value={values.email}
          onChange={onChange}
          type="email"
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          value={values.password}
          onChange={onChange}
          type="password"
        />
        <Form.Input
          label="Confirm, Password"
          placeholder="Confirm, Password.."
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={onChange}
          type="password"
        />
        <Button type="submit" primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">{errros}</ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
