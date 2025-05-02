import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../Firebase/config";
import { Button, TextField, Typography, Paper, Avatar } from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../redux/Slice/userSlice";
import {  serverTimestamp } from "firebase/firestore";

import { Box } from "@mui/system";
import GoogleIcon from "@mui/icons-material/Google";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async () => {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        name
      );
      const user = userCredential.user;
      const userData = {
        name,
        email,
        uid: user.uid,
        password,
        createdAt: serverTimestamp(),
      };

      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      dispatch(login(userData));
      setName("");
      setEmail("");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating user:", err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered.");
      } else {
        setError("Failed to create account.");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL, uid } = result.user;
      const userData = { displayName, email, photoURL, uid };
      setUser(userData);
      dispatch(login(userData));
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #e3f2fd, #90caf9)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 5,
          borderRadius: 4,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Avatar sx={{ bgcolor: "#1976d2", mb: 2 }}>{user?.photoURL}</Avatar>
        <Typography variant="h5" gutterBottom>
          Welcome Back
        </Typography>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error && !name}
        />
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error && !email}
        />
        <TextField
          fullWidth
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
          error={!!error && !password}
        />
        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Button
          fullWidth
          onClick={loginUser}
          sx={{
            mb: 3,
            backgroundColor: "#000",
            color: "#fff",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          Submit
        </Button>
        <Button
          fullWidth
          variant="contained"
          startIcon={<GoogleIcon />}
          onClick={handleLogin}
          sx={{
            textTransform: "none",
            backgroundColor: "#4285F4",
            "&:hover": { backgroundColor: "#357ae8" },
          }}
        >
          Sign in with Google
        </Button>
      </Paper>
    </Box>
  );
}
