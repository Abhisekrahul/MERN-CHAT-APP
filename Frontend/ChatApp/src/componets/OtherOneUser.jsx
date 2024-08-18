import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/UserSlice";

function OtherOneUser({ user }) {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = onlineUsers.includes(user._id);
  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={`${
          selectedUser?._id === user?._id ? "bg-orange-600" : ""
        } flex gap-2 items-center hover:bg-orange-600 rounded-sm p-2 cursor-pointer`}
      >
        <div className={`avatar ${isOnline ? "online" : " "}`}>
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user profile" />
          </div>
        </div>
        <div className="">
          <div className="flex justify-between items-center gap-2 flex-1">
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1"></div>
    </>
  );
}

export default OtherOneUser;
