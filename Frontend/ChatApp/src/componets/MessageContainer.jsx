import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/UserSlice";

function MessageContainer() {
  const { selectedUser, authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => dispatch(setSelectedUser(null));
  }, []);
  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[650px] flex flex-col">
          <div className="flex gap-2 items-center bg-orange-600 text-white px-4 py-2 mb-2">
            <div className="avatar online">
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user profile" />
              </div>
            </div>
            <div className="">
              <div className="flex justify-between items-center gap-2 flex-1">
                <p className="text-black">{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="divider my-0 py-0 h-1"></div>
          <Message />
          <SendInput />
        </div>
      ) : (
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-4xl text-black font-bold">
            <p>Hi,{authUser?.fullName}</p>
          </h1>
          <h1 className="text-black text-2xl">Let's start conversation</h1>
        </div>
      )}
    </>
  );
}

export default MessageContainer;
