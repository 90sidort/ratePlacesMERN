import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [
    {
      _id: "1",
      name: "Andrew",
      image:
        "https://www.wykop.pl/cdn/c3397992/niedoszly_andrzej_L3RXYYrnY9,q48.jpg",
      places: 3,
    },
  ];
  return <UsersList users={USERS} />;
};

export default Users;
