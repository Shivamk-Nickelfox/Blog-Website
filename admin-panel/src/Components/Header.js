
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { auth } from "../Firebase/config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import Avatar from "@mui/material/Avatar";
const AdminHeader = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AppBar
      position="static"
      color="white"
      sx={{ boxShadow: "none", borderBottom: "1px solid #ddd" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" noWrap>
          <span style={{ color: "#000", fontWeight: "bold", fontSize: "30px" }}>
            lyea
          </span>
          <span
            style={{ color: "#a78bfa", fontWeight: "bold", fontSize: "30px" }}
          >
            na
          </span>
        </Typography>
        <Stack direction="row" spacing={3}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Contact Us</Button>
        </Stack>
        <Stack direction="row" spacing={2} alignItems="center">
          {user ? (
            <Box display="flex" alignItems="center" justifyContent={"space-between"} gap={1}> 
              <Button
                onClick={handleLogout}
                variant="contained"
                color="primary"
                size="small"
              >
                Logout
              </Button>
              <Avatar alt={user.displayName} src={user.photoURL} />
            </Box>
          ) : (
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              size="small"
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
