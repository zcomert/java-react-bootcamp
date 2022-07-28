import { Route, Routes, Link } from "react-router-dom";
import ListAuthor from "./adminpages/authors/ListAuthor";
import ListBook from "./adminpages/books/ListBook";
import ListCategory from "./adminpages/categories/ListCategory";
import TopLink from "./components/links/TopLink";

import Home from "./pages/home/Home";

import data from "./data";
import { useState } from "react";


function App() {
  const [authors, setAuthors] = useState(data);

  return (
    <div>
      <TopLink authors={authors}  />
      <Routes>
        <Route path='/admin/books/list' element={<ListBook />} />
        <Route path='/admin/categories/list' element={<ListCategory />} />
        <Route
          path='/admin/authors/list'
          element={<ListAuthor authors={authors} setAuthors={setAuthors} />}
        />     
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
