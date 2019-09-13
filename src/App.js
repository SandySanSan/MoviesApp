import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import AllMoviesList from "./components/AllMoviesList";
import MoreDetails from "./components/MoreDetails";

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/movies-list' component={AllMoviesList} />
      <Route exact path='/movie-details/:id' component={MoreDetails} />
    </Switch>
  </Router>
);

// const WrappedComponent = withApiMovie(App);
export default App;
