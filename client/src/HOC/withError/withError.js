import React, { useEffect } from "react";

const withError = (WrappedComponent, axiosInstance) => {
  return (props) => {
    useEffect(() => {
      return () => {};
    }, []);

    return (
      <div>
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withError;
