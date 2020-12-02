import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./users/containers/Users";
import NewPlace from "./places/containers/NewPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import UserPlaces from "./places/containers/UserPlaces";
import UpdatePlace from "./places/containers/UpdatePlace";
import Auth from "./users/containers/Auth";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact={true}>
            <Users />
          </Route>
          <Route path="/:userId/places" exact={true}>
            <UserPlaces />
          </Route>
          <Route path="/places/new" exact={true}>
            <NewPlace />
          </Route>
          <Route path="/places/:placeId" exact={true}>
            <UpdatePlace />
          </Route>
          <Route path="/auth" exact={true}>
            <Auth />
          </Route>
          <Redirect to={"/"} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
