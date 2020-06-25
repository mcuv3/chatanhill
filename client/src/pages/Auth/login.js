import React, { useEffect } from "react";
import Form from "../../components/form/form";
import { useDisclosure, Button } from "@chakra-ui/core";
import { withRouter } from "react-router-dom";
import { useStore } from "../../store/index";

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
  const dispatch = useStore()[1];

  const success = (result) => {
    dispatch("LOG_IN", result.data);
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
