import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RoutesLinks } from "./routes-links";

import Home from "../components/home";
import Songs from "../components/songs";
import Albums from "../components/albums";
import Movies from "../components/movies";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={RoutesLinks.HOME_LINK} component={Home} />;
      <Route exact path={RoutesLinks.SONGS_LINK} component={Songs} />;
      <Route exact path={RoutesLinks.ALBUMS_LINK} component={Albums} />;
      <Route exact path={RoutesLinks.MOVIES_LINK} component={Movies} />;
      <Redirect to={RoutesLinks.HOME_LINK} />
    </Switch>
  );
};

export default Routes;
