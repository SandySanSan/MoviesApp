import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
// import withApiMovie from "./HOC/withApiMovie";
// import VideoList from "./components/VideoList";

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={Home} />
      {/* <Route
        exact
        path='/details/:id'
        component={() => (
          <VideoList
            handleClickCurrent={handleClickCurrent}
            movies={movies}
            currentMovie={currentMovie}
            youtubeKey={youtubeKey}
          /> */}
      )} />
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
);

// const WrappedComponent = withApiMovie(App);
export default App;
