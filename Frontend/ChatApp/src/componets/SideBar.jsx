import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import OtherUser from "./OtherUser";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser, setOtherUser } from "../redux/UserSlice";

function SideBar() {
  const [search, setSearch] = useState("");
  const { otherUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/user/logout");
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    } catch (error) {
      console.log(error);
    }
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUser?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      dispatch(setOtherUser([conversationUser]));
      console.log(setOtherUser);
    } else {
      toast.error("user not found");
    }
  };
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md text-white"
          type="text"
          placeholder="Search...."
        />
        <button type="submit" className="btn  bg-sky-500">
          <ImSearch size="24px" />
        </button>
      </form>
      <div className="divider px-3"></div>
      <OtherUser />
      <div className="mt-2">
        <button onClick={logOutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  );
}

export default SideBar;
