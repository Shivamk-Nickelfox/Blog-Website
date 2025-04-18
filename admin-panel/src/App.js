import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Components/Layout";
import Posts from "./Pages/Posts";
import Blog from "./Pages/Blog";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/blog" element={<Blog />} />
      </Route>
    </Routes>
  );
}

export default App;
