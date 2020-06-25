import React from "react";
import Form from "../../components/form/form";
import { useDisclosure, Button } from "@chakra-ui/core";
const formFields = {
  fullName: {
    label: "Full Name",
    errorMessage: null,
    value: "",
    isValid: true,
    placeholder: "Please enter your full name",
    type: "text",
  },
  username: {
    label: "User Name",
    errorMessage: null,
    value: "",
    isValid: true,
    placeholder: "Pick your username",
    type: "text",
  },
  cel: {
    label: "Phone Number",
    errorMessage: null,
    value: "",
    isValid: true,
    placeholder: "+(55) 555 555 5555",
    type: "text",
  },
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
  passwordConfirm: {
    label: "Confirm your password",
    errorMessage: null,
    value: "",
    isValid: true,
    placeholder: "Confirm your password",
    type: "password",
  },
};

const SignUp = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const success = (result) => {
    onClose();
    props.signedUp();
  };

  return (
    <Button {...props.buttonStyle} ml="0.5rem" onClick={onOpen}>
      SignUp
      {isOpen && (
        <Form
          onOpen={onOpen}
          onClose={onClose}
          isOpen={isOpen}
          formFields={formFields}
          success={success}
          endpoint="/user/signup"
          placement="right"
          title="Create a new account"
        />
      )}
    </Button>
  );
};

export default SignUp;
