import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import { getAllCategories } from "../../store/actions/categoryActions";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Tooltip } from "@mui/material";

export default function AddBook() {
  const { categories } = useSelector((state) => state.category);
  const bookDispatch = useDispatch();

  useEffect(() => {
    bookDispatch(getAllCategories());
  }, []);

  return (
    <Grid  sx={{m:2}} container spacing={2}>
      <Grid item xs={6} md={4}>
        <FormControl>
          <FormLabel id='category-label'>Category</FormLabel>
          <RadioGroup
            aria-labelledby='category-label'
            // defaultValue='female'
            name='radio-buttons-group'
          >
            {categories.map((cat) => {
              const {id, categoryName, description} = cat;
              return (
              
                <FormControlLabel key={id}
                  value={id}
                  control={<Radio />}
                  label={categoryName}
                />
                
              );
            })}
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6} md={8}>
        2
      </Grid>
    </Grid>
  );
}
