import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
  const [drawerIsOpened, setDrawerIsOpened] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpened(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpened(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpened && <Backdrop onClick={closeDrawerHandler} />}
      {drawerIsOpened && (
        <SideDrawer show={drawerIsOpened} onClick={closeDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={openDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
