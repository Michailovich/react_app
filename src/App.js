import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Navbar from "./component/UI/navbar/Navbar";
import About from "./pages/About";
import PostIdPage from "./pages/PostIdPage";
import Posts from "./pages/Posts";
import { routes } from "./router";

import './style/App.css';

function App() {
  return(
    <Router>
        <Navbar/>
        <Routes>
          <Route path="/about" element={<About />} /> 
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostIdPage />} />
        </Routes>
          
    </Router>
  )
}

export default App;
