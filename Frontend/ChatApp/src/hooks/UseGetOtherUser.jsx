import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../redux/UserSlice";

const UseGetOtherUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOtherUser = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3000/api/v1/user/`);
        dispatch(setOtherUser(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOtherUser();
  }, []);
};

export default UseGetOtherUser;
