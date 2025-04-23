import React from "react";
import { auth, provider, signInWithPopup } from "../Firebase/config";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";
import store from "../redux/store";

export default function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL, uid } = result.user;
      const userData = { displayName, email, photoURL, uid };
      console.log("userData", userData);
      setUser(userData);
      dispatch(login(userData));
      console.log("user logged in", store.getState());

      // Save user data to local storage
      // This is optional, as we are already using Redux to manage user state
      // You can remove this if you don't need it
      localStorage.setItem("user", JSON.stringify(userData));
      console.log("User logged in:", userData);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogin}
      sx={{
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "200px",
        height: "50px",
        backgroundColor: "#4285F4",
        color: "#fff",
        "&:hover": { backgroundColor: "#357ae8" },
      }}
    >
      Sign in with Google
    </Button>
  );
}
