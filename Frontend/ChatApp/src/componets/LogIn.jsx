import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/UserSlice";
function LogIn() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/login`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      navigate("/");

      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      userName: "",
      password: "",
    });
  };
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">LogIn</h1>
        <form onSubmit={submitHandler} action="">
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter User Name..."
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter password ..."
            />
          </div>
          <p className="text-center my-2">
            Don't have an Account? <Link to="/signup">signup</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
