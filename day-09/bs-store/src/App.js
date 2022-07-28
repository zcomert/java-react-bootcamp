import { Route, Routes, Link } from "react-router-dom";
import ListAuthor from "./adminpages/authors/ListAuthor";
import ListBook from "./adminpages/books/ListBook";
import ListCategory from "./adminpages/categories/ListCategory";
import TopLink from "./components/links/TopLink";
import Add from "./pages/author/Add";
import List from "./pages/author/List";
import Put from "./pages/author/Put";
import Home from "./pages/home/Home";

import data from "./data";
import { useState } from "react";
import AddAuthor from "./adminpages/authors/AddAuthor";

function App() {
  const [authors, setAuthors] = useState(data);

  return (
    <div>
      <TopLink />
      <Routes>
        <Route path='/admin/books/list' element={<ListBook />} />
        <Route path='/admin/categories/list' element={<ListCategory />} />
        <Route
          path='/admin/authors/list'
          element={<ListAuthor authors={authors} />}
        />
        <Route path="/admin/authors/add" element={<AddAuthor />} />

        <Route path='/author/list' element={<List />} />
        <Route path='/author/add' element={<Add />} />
        <Route path='/author/put' element={<Put />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
