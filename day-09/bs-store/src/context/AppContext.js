import React, { createContext, useState } from "react";
import data from "../data";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
   
    const [authors, setAuthors] = useState(data);
    
    const values = {
    message: "selam",
    numbers: 5,
    authors,
    setAuthors
  };
  
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
export default AppContext;
