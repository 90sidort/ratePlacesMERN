import React, { useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import { AuthContext } from "../../shared/context/auth-context";

const Comments = (props) => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      comment: { value: "", isValid: false },
    },
    false
  );
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/kuc`,
        {
          method: "POST",
          body: { comment: formState.inputs.comment.value },
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
    } catch (e) {}
  };

  return (
    <div>
      <form className="place-form" onSubmit={addCommentHandler}>
        <Input
          id="comment"
          type="text"
          label="Comment"
          element="input"
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText="Comment must have at least one character."
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid} type="submit">
          Add comment
        </Button>
      </form>
    </div>
  );
};

export default Comments;
