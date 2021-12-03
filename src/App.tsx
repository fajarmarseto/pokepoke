import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./Services/Client";
import "./App.css";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";
import MyPocket from "./Pages/MyPocket";
import PageNotFound from "./Components/PageNotFound";

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/my-pocket" element={<MyPocket />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
