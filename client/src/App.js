import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import LayOut from "./HOC/LayOut/LayOut";
import Home from "./pages/home/home";
import Index from "./pages/Index/index";
import { useStore } from "./store/index";

const App = () => {
  const [state, dispatch] = useStore();

  useEffect(() => {
    if (!state.auth.token) dispatch("CHECK_CREDENTIALS", dispatch);
  }, [state.auth.token]);

  let Routes = (
    <LayOut>
      <Suspense fallback={<div>loading ... </div>}>
        <Switch>
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </LayOut>
  );
  if (state.auth.token) {
    Routes = (
      <Suspense fallback={<div>loading ... </div>}>
        <Switch>
          <Route path={"/" + state.auth.user.username} component={Index} />
          <Redirect to={"/" + state.auth.user.username} />
        </Switch>
      </Suspense>
    );
  }
  return <BrowserRouter>{Routes}</BrowserRouter>;
};

export default App;
