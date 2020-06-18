import React from "react";

const LayOut = (props) => {
  return (
    <div>
      <nav></nav>
      <main>{props.children}</main>
    </div>
  );
};

export default LayOut;
