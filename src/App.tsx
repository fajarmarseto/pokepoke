import React, { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./Services/Client";
import "./App.css";
import { ProviderContext } from "./Services/Store";
import Header from "./Components/Header";
import Detail from "./Pages/Detail";
import Home from "./Pages/Home";
import MyPocket from "./Pages/MyPocket";
import PageNotFound from "./Components/PageNotFound";

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <ProviderContext>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:name/" element={<Detail />} />
            <Route path="/detail/:name/:myPokeName" element={<Detail />} />
            <Route path="/my-pocket" element={<MyPocket />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ProviderContext>
    </ApolloProvider>
  );
};

export default App;
