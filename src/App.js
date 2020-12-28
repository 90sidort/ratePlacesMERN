import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Users from "./users/containers/Users";
import NewPlace from "./places/containers/NewPlace";
import MainNavigation from "./shared/components/navigation/MainNavigation";
import UserPlaces from "./places/containers/UserPlaces";
import UpdatePlace from "./places/containers/UpdatePlace";
import Auth from "./users/containers/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";
import PlaceDetails from "./places/components/PlaceDetails";
import UserInfo from "./users/containers/UserInfo";

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
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
        <Route path="/placedetails/:placeId" exact={true}>
          <PlaceDetails />
        </Route>
        <Route>
          <UserInfo path="/userdetails/:userId" exact={true} />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact={true}>
          <Users />
        </Route>
        <Route path="/:userId/places" exact={true}>
          <UserPlaces />
        </Route>
        <Route path="/auth" exact={true}>
          <Auth />
        </Route>
        <Route path="/placedetails/:placeId" exact={true}>
          <PlaceDetails />
        </Route>
        <Route>
          <UserInfo path="/userdetails/:userId" exact={true} />
        </Route>
        {/* <Redirect to={"/auth"} /> */}
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
