import React, { MouseEventHandler, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./SignUp.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/slices/userReducer";

type SignUpProps = {
  showSignIn: MouseEventHandler<HTMLParagraphElement>;
  signUp: boolean;
};

const SignUp = ({ showSignIn, signUp }: SignUpProps) => {
  // form field states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const nav = useNavigate();
  const dispatch = useDispatch();
  // form handlers
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };



  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (password === confirmPassword) {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/register",
        { email, name, password }
      );
      console.log(response);
      if (response.data.accessToken !== "") {
        dispatch(logIn());
        nav("/");
      }
    } else {
      setPasswordsMatch(false);
    }
  };

  const keyPress = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if(e.keyCode === 13){
      if (password === confirmPassword) {
        const response = await axios.post(
          "http://localhost:4000/api/v1/users/register",
          { email, name, password }
        );
        console.log(response);
        if (response.data.accessToken !== "") {
          dispatch(logIn());
          nav("/");
        }
      } else {
        setPasswordsMatch(false);
      }
      }
 }
  return (
    <form
      className="signup"
      style={{ display: signUp ? "flex" : "none" }}
      onSubmit={handleSubmit}
      onKeyDown={keyPress}
    >
      <h1 className="signup__heading">SIGN UP</h1>
      <input
        name="email"
        type={"email"}
        className="singup__email"
        placeholder="Email"
        onChange={handleEmailChange}
        required
      />
      <input
        name="name"
        type={"text"}
        className="singup__email"
        placeholder="Name"
        onChange={handleNameChange}
        required
      />
      <input
        name="password"
        type={"password"}
        className="signup__password"
        placeholder="Password"
        onChange={handlePasswordChange}
        required
      />
      <input
        name="confirmPassword"
        type={"password"}
        className="signup__password"
        placeholder="Confirm Password"
        onChange={handleConfirmPasswordChange}
        required
      />
      <Typography
        color="error"
        sx={{ display: passwordsMatch ? "none" : "block" }}
      >
        Passwords dont match
      </Typography>
      <input type="submit" value={"SIGN UP"} className="signup__btn"/>
      <p className="already" onClick={showSignIn}>
        Already have an account?
      </p>
    </form>
  );
};

export default SignUp;
