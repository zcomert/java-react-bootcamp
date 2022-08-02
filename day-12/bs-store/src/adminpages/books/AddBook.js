import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { getAllCategories } from "../../store/actions/categoryActions";
import { getAllAuthors } from "../../store/actions/authorActions";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  Button,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";

export default function AddBook() {
  const { categories } = useSelector((state) => state.category);
  const { authors } = useSelector((state) => state.author);
  const bookDispatch = useDispatch();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      title: "",
      price: "",
      publisher: "",
      categoryId: "",
      bookAuthors: [],
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  useEffect(() => {
    bookDispatch(getAllCategories());
    bookDispatch(getAllAuthors());
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input id="title" type='title' value={values.title} onChange={handleChange} />
      <input id="price" type='price' value={values.price} onChange={handleChange} />
      <input id="publisher" type='publisher' value={values.publisher} 
      onChange={handleChange}
      />
      
      <div>
        <input 
        type='radio' 
        name='categoryId' 
        onChange={handleChange}
        value='1' />
        <label for='html'>cat-1</label>
        <br />
        <input type='radio' name='categoryId' value='2' onChange={handleChange} />
        <label for='css'>cat-2</label>
       
      </div>
      
      <div>
        <label>Authors</label>
        <select name='bookAuthors' onChange={handleChange}>
          <option value='10'>yazar1</option>
          <option value='20'>yazar2</option>
          <option value='30'>yazar3</option>
          <option value='40'>yazar3</option>
        </select>
      </div>
      <input type="submit" value="submit" />
      {JSON.stringify(values)}
    </form>
  );
}
