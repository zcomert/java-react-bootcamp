import React, { createContext, useState } from "react";
const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
   
    const [isLoading, setIsLoading] = useState(false);
    
    const values = {
    message: "selam",
    isLoading,
    setIsLoading
  };
  
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
export default AppContext;
