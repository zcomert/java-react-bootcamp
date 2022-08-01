import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import AuthorService from "../../services/AuthorService";
import CategoryService from "../../services/CategoryService";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import BookService from "../../services/BookService";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postOneBook } from "../../store/actions/bookActions";

export default function AddBook() {
  const navigate = useNavigate();

  const selector = useSelector((state) => state.book);
  const bookDispatch = useDispatch();

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const authorService = new AuthorService();
  const categoryService = new CategoryService();
  const bookService = new BookService();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      authorIds: [],
      categoryId: "",
      title: "",
    },
    onSubmit: async (values) => {
      // await bookService
      //   .postOneBook(values)
      //   .then((resp) => resp.data)
      //   .catch((err) => alert(err));

      bookDispatch(postOneBook(values));
      navigate("/books/list");
    },
  });

  useEffect(() => {
    authorService.getAllAuthors().then((resp) => setAuthors(resp.data));
    categoryService.getAllCategories().then((resp) => setCategories(resp.data));
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ m: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Stack direction='column' spacing={2}>
              <FormControl>
                <FormLabel id='categories'>Categories</FormLabel>
                <RadioGroup
                  aria-labelledby='categories'
                  defaultValue='4'
                  name='categoryId'
                >
                  {categories.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      value={category.id}
                      control={<Radio />}
                      label={category.categoryName}
                      onChange={handleChange}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <FormControl fullWidth sx={{ width: "100%" }}>
                <InputLabel id='authorIds'>Authors</InputLabel>
                <Select
                  name='authorIds'
                  value={values.authorIds}
                  onChange={handleChange}
                  label='Authors'
                  multiple
                >
                  {authors.map((author) => (
                    <MenuItem
                      value={author.id}
                      key={author.id}
                    >{`${author.firstName} ${author.lastName}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>

          <Grid item xs={9}>
            <Stack direction='column' spacing={2}>
              <FormControl fullWidth>
                <TextField
                  name='title'
                  required
                  label='Title'
                  variant='outlined'
                  onChange={handleChange}
                  value={values.title}
                ></TextField>
              </FormControl>

              <ButtonGroup>
                <Button variant='contained' type='submit'>
                  Add
                </Button>
                <Button
                  variant='outlined'
                  onClick={() => navigate("/books/list")}
                >
                  Book List
                </Button>
              </ButtonGroup>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}
