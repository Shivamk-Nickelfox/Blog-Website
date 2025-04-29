import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function ProtectedRoute({ children, user }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (user) {
    return children;
  } else {
    return null;
  }
}
