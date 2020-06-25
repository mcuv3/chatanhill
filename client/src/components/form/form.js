import React, { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  Stack,
  FormLabel,
  Input,
  FormErrorMessage,
  DrawerFooter,
  FormControl,
  Spinner,
} from "@chakra-ui/core";

const Form = (props) => {
  const firstField = useRef();
  const [form, setForm] = useState(props.formFields);
  const [loading, setLoading] = useState(false);

  const onChange = (e, key) => {
    const newForm = { ...form };
    newForm[key].value = e.target.value;
    setForm(newForm);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const submitForm = {};
    for (let key in form) submitForm[key] = form[key].value;
    setLoading(true);
    axios
      .post(props.endpoint, submitForm)
      .then((result) => props.success(result))
      .catch((e) => {
        setLoading(false);
        const errors = e.response.data.errors;
        const formWithErrors = {};
        for (let key in form)
          formWithErrors[key] = {
            ...form[key],
            isValid: true,
            errorMessage: null,
          };
        errors.forEach((error) => {
          formWithErrors[error.param].errorMessage = error.msg;
          formWithErrors[error.param].isValid = false;
        });
        setForm(formWithErrors);
      });
  };

  const formGroups = [];
  for (let key in form) formGroups.push({ key, values: form[key] });

  return (
    <Drawer
      isOpen={props.isOpen}
      placement={props.placement}
      initialFocusRef={firstField}
      onClose={props.onClose}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">{props.title}</DrawerHeader>
        <form onSubmit={onSubmit}>
          <DrawerBody>
            <Stack spacing="24px">
              {formGroups.map((formGroup, index) => {
                return (
                  <FormControl
                    isInvalid={!formGroup.values.isValid}
                    key={formGroup.key}
                  >
                    <FormLabel htmlFor={formGroup.key}>
                      {formGroup.values.label}
                    </FormLabel>
                    <Input
                      ref={index === 0 ? firstField : null}
                      id={formGroup.key}
                      placeholder={formGroup.values.placeholder}
                      value={formGroup.value}
                      onChange={(e) => onChange(e, formGroup.key)}
                      type={formGroup.values.type}
                    />
                    <FormErrorMessage>
                      {formGroup.values.errorMessage}
                    </FormErrorMessage>
                  </FormControl>
                );
              })}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {loading && <Spinner mt={2} mr={3} />}
            <Button variant="outline" mr={3} onClick={props.onClose}>
              Cancel
            </Button>
            <Button variantColor="blue" type="submit" disabled={loading}>
              Submit
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default Form;
