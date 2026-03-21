import React, { createContext } from "react";
import BookStore from "../flux/stores/Bookstore";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {

  return (
    <StoreContext.Provider value={BookStore}>
      {children}
    </StoreContext.Provider>
  );

};
