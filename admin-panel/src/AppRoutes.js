// src/AppRoutes.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Blog from "./Pages/Blog/Components/Blog";
import Posts from "./Pages/Posts/Posts";
import Dashboard from "./Pages/Dashboard";
import Contact from "./Pages/Contact";
import Login from "./auth/Login";
import EditBlog from "./Pages/Posts/EditBlog";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/posts/edit/:postId" element={<EditBlog />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
