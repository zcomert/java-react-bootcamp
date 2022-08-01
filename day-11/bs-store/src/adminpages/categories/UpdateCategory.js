import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Box, Stack, TextField } from "@mui/material";
import React from "react";
import { getOneCategory, putOneCategory } from "../../store/actions/categoryActions";
import { useNavigate, useParams } from "react-router-dom";
import SimpleSnackbar from "../../components/snackBar/SimpleSnackbar";
import { setMessage } from "../../store/actions/settingActions";


export default function UpdateCategory() {
  const categoryDispatch = useDispatch();
  const navigate = useNavigate();
  
  const { message } = useSelector((state) => state.setting);
  const {category} = useSelector(state => state.category);
  
  const {id} = useParams();
  const [form, setForm] = useState({
    categoryName: "",
    description: "",
  });

  useEffect(() => {
    categoryDispatch(getOneCategory(id))
    setForm({
        categoryName: category.categoryName,
        description : category.description
    })
  },[]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    categoryDispatch(putOneCategory(id,form));
    categoryDispatch(setMessage("Category has been updated."));
    navigate("/admin/categories/list");
  };

  return (
    <Box sx={{ m: 3 }} maxWidth={"md"}>
      <Stack spacing={3}>
        <TextField
          name='categoryName'
          label='Category Name'
          onChange={handleChange}
          value={form.categoryName}
        ></TextField>

        <TextField
          name='description'
          label='Description'
          value={form.description}
          onChange={handleChange}
        ></TextField>

        <Button onClick={handleClick} variant='contained'>
          Save
        </Button>
      </Stack>
    </Box>
  );
}
