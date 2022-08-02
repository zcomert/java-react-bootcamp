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

export default function AddBook() {
  const { categories } = useSelector((state) => state.category);
  const { authors } = useSelector((state) => state.author);
  const bookDispatch = useDispatch();

  useEffect(() => {
    bookDispatch(getAllCategories());
    bookDispatch(getAllAuthors());
  }, []);

  return (
    <form>
      <Grid sx={{ m: 2 }} container spacing={2}>
        <Grid item xs={6} md={4}>
          <FormControl>
            <FormLabel id='category-label'>Category</FormLabel>
            <RadioGroup
              aria-labelledby='category-label'
              // defaultValue='female'
              name='radio-buttons-group'
            >
              {categories.map((cat) => {
                const { id, categoryName, description } = cat;
                return (
                  <FormControlLabel
                    key={id}
                    value={id}
                    control={<Radio />}
                    label={categoryName}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id='demo-multiple-name-label'>Name</InputLabel>
            <Select
              labelId='demo-multiple-name-label'
              id='demo-multiple-name'
              multiple
              value={[]}
              // onChange={handleChange}
              input={<OutlinedInput label='Name' />}
              // MenuProps={MenuProps}
            >
              {authors.map((author) => (
                <MenuItem
                  key={author.id}
                  value={author.id}
                  // style={getStyles(name, personName, theme)}
                >
                  {author.firstName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6} md={8}>
          <Stack spacing={3}>
            <TextField name='title'></TextField>
            <TextField name='price'></TextField>
            <TextField name='publisher'></TextField>
            <Button variant='contained'>Add</Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
