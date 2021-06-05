import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PageRender from './PageRender';

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={PageRender} />
        <Route exact path="/:page" component={PageRender} />
        <Route exact path="/:page/:slug" component={PageRender} />
      </Switch>
    </div>
  );
}

export default App;
