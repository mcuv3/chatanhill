import React, { useEffect, useContext } from "react";
import Form from "../../components/form/form";
import { useDisclosure, Button } from "@chakra-ui/core";
import { authContext } from "../../auth-context/auth-context";
import { withRouter } from "react-router-dom";

const formFields = {
  email: {
    label: "Email",
    errorMessage: null,
    value: "",
    isValid: true,
    placeholder: "Please enter your email",
    type: "email",
  },
  password: {
    label: "Password",
    errorMessage: null,
    value: "",
    isValid: true,
    placeholder: "Please enter your password",
    type: "password",
  },
};

const SignUp = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logIn = useContext(authContext).logIn;
  const success = (result) => {
    onClose();
    logIn(result.data);
    props.history.replace("/" + result.data.username);
    console.log(result);
  };
  useEffect(() => {
    if (props.justCreateAccount && !isOpen) onOpen();
    if (isOpen) props.toggleJustCreateAccount();
  });

  return (
    <Button {...props.buttonStyle} onClick={onOpen}>
      LogIn
      {isOpen && (
        <Form
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          formFields={formFields}
          success={success}
          endpoint="/user/login"
          placement="left"
          title="Log In"
        />
      )}
    </Button>
  );
};

export default withRouter(SignUp);
