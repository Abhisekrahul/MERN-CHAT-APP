import React from "react";
import OtherOneUser from "./OtherOneUser";
import UseGetOtherUser from "../hooks/UseGetOtherUser";
import { useSelector } from "react-redux";

const OtherUser = () => {
  UseGetOtherUser();
  const { otherUser } = useSelector((store) => store.user);
  if (!otherUser) {
    return;
  }
  return (
    <div className="overflow-auto flex-1">
      {otherUser?.map((user) => {
        return <OtherOneUser key={user._id} user={user} />;
      })}
    </div>
  );
};

export default OtherUser;
