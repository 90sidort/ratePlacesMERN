import React, { useReducer, useEffect } from "react";

import { validate } from "../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isTouched: false,
    isValid: props.initialValid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({
      type: "CHANGE",
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  let element;

  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
        data-test={props.dataTest}
      />
    );
  } else if (props.element === "textarea") {
    element = (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={props.id !== "description" ? touchHandler : () => {}}
        value={inputState.value}
      />
    );
  } else if (props.element === "select") {
    element = (
      <select onChange={changeHandler} value={inputState.value}>
        {props.options.map((opt) => {
          return (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          );
        })}
      </select>
    );
  }

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && (
        <p data-test={`error_${props.label}`}>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
