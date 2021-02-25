import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";

import UsersList from "../components/UsersList";

const PopularUsers = () => {
  const [fetchedPopular, updatefetchedPopular] = useState([]);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/popular`
        );
        updatefetchedPopular(responseData.users);
      } catch (e) {}
    };
    fetchPopular();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && fetchedPopular && <UsersList users={fetchedPopular} />}
    </React.Fragment>
  );
};

export default PopularUsers;
