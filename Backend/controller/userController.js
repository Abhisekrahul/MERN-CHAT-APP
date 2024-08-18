// dotenv.config({});
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        success: false,
        message: "All Fileds are required..",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "password do not match",
      });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exsit try diffrent",
      });
    }
    //password hash
    const hashPassword = await bcrypt.hash(password, 10);

    //profile photo
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username:${userName}`;
    const feMaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username:${userName}`;

    await User.create({
      fullName,
      userName,
      password: hashPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : feMaleProfilePhoto,
      gender,
    });
    return res.status(200).json({
      success: true,
      message: "User data is created..",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong ",
    });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All Fileds are required..",
      });
    }
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect userName and password",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect userName and password",
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

//Logout
export const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout SucessFully",
    });
  } catch (error) {
    console.log(error);
  }
};

//GetOther User
export const getOtherUser = async (req, res) => {
  try {
    const loggedInUser = req.id;
    const otherUser = await User.find({ _id: { $ne: loggedInUser } }).select(
      "-password"
    );
    return res.status(200).json(otherUser);
  } catch (error) {
    console.log(error);
  }
};
