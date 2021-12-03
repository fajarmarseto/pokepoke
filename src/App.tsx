import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";
import MyPocket from "./Pages/MyPocket";
import PageNotFound from "./Pages/PageNotFound";

const App: FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/my-pocket" element={<MyPocket />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
