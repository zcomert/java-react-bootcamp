import { Route, Routes, Link } from "react-router-dom";
import ListAuthor from "./adminpages/authors/ListAuthor";
import ListBook from "./adminpages/books/ListBook";
import ListCategory from "./adminpages/categories/ListCategory";
import TopLink from "./components/links/TopLink";
import AppContext from "./context/AppContext";
import { useContext } from "react";
import Home from "./pages/home/Home";
import AdminAppbar from "./components/adminAppbar/AdminAppbar";
import AddAuthor from "./adminpages/authors/AddAuthor";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

function App() {
  const { authors, setAuthors, isLoading, setIsLoading } = useContext(AppContext);

  return (
    <div>
      <AdminAppbar />
      {isLoading ? (
        <Box sx={{ 
          position:"absolute",
          display: "flex", 
          justifyContent: "center",
          width:"100vw",
          height:'100vh',
          alignItems:"center"
          }}>
          <CircularProgress />
        </Box>
      ) : (
        ""
      )}

      

      <Routes>
        <Route path='/admin/books/list' element={<ListBook />} />
        <Route path='/admin/categories/list' element={<ListCategory />} />
        <Route path='/admin/authors/list' element={<ListAuthor />} />
        <Route path='/admin/authors/add' element={<AddAuthor />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
