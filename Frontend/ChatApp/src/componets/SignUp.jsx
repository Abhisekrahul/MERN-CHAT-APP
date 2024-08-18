import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handelCheckBox = (gender) => {
    setUser({ ...user, gender });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      e.preventDefault();
      const res = await axios.post(
        `http://localhost:3000/api/v1/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-gray-300">SignUp</h1>
        <form onSubmit={submitHandler}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Enter full name ..."
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              value={user.userName}
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              value={user.password}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter password ..."
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              onChange={(e) =>
                setUser({ ...user, confirmPassword: e.target.value })
              }
              value={user.confirmPassword}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Enter confirm password ... "
            />
          </div>
          <div className="flex items-center my-4">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handelCheckBox("male")}
                defaultChecked
                className="checkbox checkbox-primary mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handelCheckBox("female")}
                defaultChecked
                className="checkbox checkbox-primary mx-2"
              />
            </div>
          </div>
          <p className="text-center my-2">
            Already have an Account? <Link to="/login">login</Link>
          </p>
          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2 border border-slate-700"
            >
              signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
