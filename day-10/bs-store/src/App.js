import { useContext, useEffect } from "react";
import { Route, Routes, Link } from "react-router-dom";
import ListAuthor from "./adminpages/authors/ListAuthor";
import ListBook from "./adminpages/books/ListBook";
import ListCategory from "./adminpages/categories/ListCategory";
import AppContext from "./context/AppContext";
import Home from "./pages/home/Home";
import AdminAppbar from "./components/adminAppbar/AdminAppbar";
import AddAuthor from "./adminpages/authors/AddAuthor";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import UpdateAuthor from "./adminpages/authors/UpdateAuthor";

function App() {
  const { isLoading, setIsLoading } = useContext(AppContext);
  return (
    <>
      <AdminAppbar />
      {isLoading ? (
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            width: "100vw",
            height: "100vh",
            alignItems: "center",
          }}
        >
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
        <Route path='/admin/authors/update/:id' element={<UpdateAuthor />} />

        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
