import React from "react";
import { auth, provider, signInWithPopup } from "../Firebase/config";
import { Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const userData = { displayName, email, photoURL };
      setUser(userData);
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
      sx={{ textTransform: "none" }}
    >
      Sign in with Google
    </Button>
  );
}
