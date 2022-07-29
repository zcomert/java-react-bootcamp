import { Route, Routes, Link } from "react-router-dom";
import ListAuthor from "./adminpages/authors/ListAuthor";
import ListBook from "./adminpages/books/ListBook";
import ListCategory from "./adminpages/categories/ListCategory";
import TopLink from "./components/links/TopLink";
import AppContext from "./context/AppContext";
import { useContext } from "react";
import Home from "./pages/home/Home";
import AdminAppbar from "./components/adminAppbar/AdminAppbar";


function App() {
 const  {authors, setAuthors} = useContext(AppContext);

  return (
    <div>
      <AdminAppbar />
      <Routes>
        <Route path='/admin/books/list' element={<ListBook />} />
        <Route path='/admin/categories/list' element={<ListCategory />} />
        <Route
          path='/admin/authors/list'
          element={<ListAuthor />}
        />     
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
