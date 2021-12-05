import React, { useState, createContext } from "react";
import { GET_LOCAL_STORAGE } from "../../Helpers";

const store = {
  myPocket: GET_LOCAL_STORAGE("myPocket"),
};

const AppContext = createContext(GET_LOCAL_STORAGE("myPocket"));

const ProviderContext = ({ children }) => {
  const [state, setState] = useState(store);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, ProviderContext };
