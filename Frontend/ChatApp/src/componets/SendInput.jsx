import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

function SendInput() {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { messages } = useSelector((store) => store.message);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      // const currentMessages = Array.isArray(messages) ? messages : [];
      dispatch(setMessages([...(messages || []), res?.data?.newMessage]));
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <form onSubmit={onSubmitHandler} className="py-4 my-3">
      <div className="w-full relative">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="send Message ....."
          className="border text-sm p-3 border-zinc-500 rounded-lg block w-full bg-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute  flex inset-y-0 end-0 items-center pr-4"
        >
          <IoMdSend />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
