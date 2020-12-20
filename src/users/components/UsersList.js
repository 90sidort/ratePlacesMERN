import React from "react";
import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = (props) => {
  if (props.users.length === 0) {
    return (
      <div className="center">
        <Card>No users found.</Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.users.map((user) => (
        <UserItem
          key={user._id}
          id={user._id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};

export default UsersList;
