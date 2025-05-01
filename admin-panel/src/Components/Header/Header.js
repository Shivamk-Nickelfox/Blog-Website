import React, { useEffect, useState } from "react";
import { Button, Avatar } from "@mui/material";
import { auth, signOut } from "../../Firebase/config";
import { useNavigate } from "react-router";
import {
  StyledAppBar,
  StyledToolbar,
  LogoText,
  NavLinks,
  UserSection,
  AvatarBox,
} from "./HeaderStyles";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/Slice/userSlice";
const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    signOut(auth);
    localStorage.removeItem("user");
    dispatch(logout());
    setUser(null);
    navigate("/login");
  };

  return (
    <StyledAppBar position="static" elevation={1}>
      <StyledToolbar>
        <LogoText variant="h4">
          Shiv<span style={{ color: "#8A63D2" }}>am</span>
        </LogoText>

        <NavLinks>
          <Button color="primary">Home</Button>
          <Button onClick={() => navigate("/contact")} color="primary">
            Contact Us
          </Button>
        </NavLinks>

        {user && (
          <UserSection>
            <Button
              variant="contained"
              onClick={handleLogout}
              sx={{ textTransform: "none" }}
            >
              Logout
            </Button>
            <AvatarBox>
              <Avatar
                src={user.photoURL}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/dashboard")}
              />
            </AvatarBox>
          </UserSection>
        )}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
