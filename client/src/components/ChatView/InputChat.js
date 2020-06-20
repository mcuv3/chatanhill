import React, { useState } from "react";
import { Input, Flex, IconButton, Box } from "@chakra-ui/core";
const InputChat = (props) => {
  const [message, setMessage] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setMessage("");
    props.setNewMessage(message);
  };

  return (
    <form onSubmit={submit}>
      <Flex width="100%" justifyContent="space-between" alignItems="center">
        <IconButton
          variantColor="teal"
          aria-label="Send email"
          icon="star"
          size="md"
        />
        <Box width="100%">
          <Input
            rounded="0"
            placeholder="Send a message"
            focusBorderColor="#319795"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </Box>

        <IconButton
          variantColor="teal"
          aria-label="Send email"
          icon="arrow-forward"
          size="md"
          type="submit"
        />
      </Flex>
    </form>
  );
};

export default InputChat;
