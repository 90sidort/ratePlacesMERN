import React from "react";
import { Link } from "react-router-dom";

import "./Button.css";

const Button = (props) => {
  console.log(props);
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"} ${props.like && "button--like"} `}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`button button--${props.size || "default"} ${
          props.inverse && "button--inverse"
        } ${props.danger && "button--danger"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${
        props.inverse && "button--inverse"
      } ${props.danger && "button--danger"} ${props.like && "button--like"} ${
        props.unlike && "button--unlike"
      } `}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      data-test={props.dataTest}
    >
      {props.children}
    </button>
  );
};

export default Button;
