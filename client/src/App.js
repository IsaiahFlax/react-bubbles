import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import PrivateRoute from './components/PrivateRoute'
import Login from "./components/Login";
import "./styles.scss";
import BubblePage from "./components/BubblePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Switch>
          <PrivateRoute exact path="/protected" component={BubblePage} />
          <Route path="/login" component={Login} />
          {/*<Route render={() => <Redirect to="/login" />} />*/}
          <Redirect to="/login" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
