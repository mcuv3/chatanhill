import React from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";

const Search = () => {
  return (
    <InputGroup>
      <InputLeftElement children={<Icon name="search" color="#38B2AC" />} />

      <Input
        type="phone"
        placeholder="Search or start new chat"
        focusBorderColor="#319795"
        borderRadius="0px"
      />
    </InputGroup>
  );
};

export default Search;
