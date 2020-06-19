import React, { Suspense, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { authContext } from "./auth-context/auth-context";
import LayOut from "./HOC/LayOut/LayOut";
import Home from "./pages/home/home";
import Index from "./pages/Index/index";

const App = () => {
  const { token, user, checkCredentials } = useContext(authContext);

  useEffect(() => {
    if (!token) checkCredentials();
  }, []);

  let Routes = (
    <LayOut>
      <Suspense fallback={<div>loading ... </div>}>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Suspense>
    </LayOut>
  );
  if (token) {
    Routes = (
      <Suspense fallback={<div>loading ... </div>}>
        <Switch>
          <Route path={"/" + user.username} component={Index} />
          <Redirect to={"/" + user.username} />
        </Switch>
      </Suspense>
    );
  }
  return <BrowserRouter>{Routes}</BrowserRouter>;
};

export default App;
