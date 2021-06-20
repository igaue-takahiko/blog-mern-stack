import React from "react";
import { Route, Switch } from "react-router-dom";

import PageRender from "./PageRender";
import { Header, Footer } from "./components/global";
import { Alert } from "./components/alert/Alert";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Alert />
        <Switch>
          <Route exact path="/" component={PageRender} />
          <Route exact path="/:page" component={PageRender} />
          <Route exact path="/:page/:slug" component={PageRender} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
