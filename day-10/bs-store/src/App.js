import { Route, Routes, Link } from "react-router-dom";
import ListAuthor from "./adminpages/authors/ListAuthor";
import ListBook from "./adminpages/books/ListBook";
import ListCategory from "./adminpages/categories/ListCategory";
import Home from "./pages/home/Home";
import AdminAppbar from "./components/adminAppbar/AdminAppbar";
import AddAuthor from "./adminpages/authors/AddAuthor";


import AddCategory from "./adminpages/categories/AddCategory";
import SimpleSnackbar from "./components/snackBar/SimpleSnackbar";

import {useSelector} from "react-redux";
import UpdateCategory from "./adminpages/categories/UpdateCategory";
import AddBook from "./adminpages/books/AddBook"
import Login from "./pages/login/Login";


function App() {
  const {message, showSnackbar} = useSelector(state => state.setting);
  return (
    <div>
      <AdminAppbar />

      <Routes>
        <Route path='/admin/books/list' element={<ListBook />} />
        <Route path='/admin/books/add' element={<AddBook />} />
        
        <Route path='/admin/categories/list' element={<ListCategory />} />
        <Route path='/admin/categories/add' element={<AddCategory />} />
        <Route path='/admin/categories/update/:id' element={<UpdateCategory />} />
        
        <Route path='/admin/authors/list' element={<ListAuthor />} />
        <Route path='/admin/authors/add' element={<AddAuthor />} />
        
        <Route path='/auth/login' element={<Login />} />

        <Route path='/' element={<Home />} />
      </Routes>

      <SimpleSnackbar message={message} showSnackbar={showSnackbar} />
    </div>
  );
}

export default App;
