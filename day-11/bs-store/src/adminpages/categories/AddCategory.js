import {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Box, Stack, TextField } from "@mui/material";
import React from "react";
import {postOneCategory} from "../../store/actions/categoryActions";
import {useNavigate} from "react-router-dom";
import SimpleSnackbar from "../../components/snackBar/SimpleSnackbar";
import { setMessage } from "../../store/actions/settingActions";

export default function AddCategory() {

  const categoryDispatch = useDispatch();
  const {message} = useSelector(state => state.setting)
    
    const [form, setForm] = useState({
        categoryName: '',
        description:''
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const handleClick = () => {
        categoryDispatch(postOneCategory(form));
        categoryDispatch(setMessage("Category has been added."));
    }
  
    return (
    <Box sx={{m:3}} maxWidth={'md'} >
      <Stack spacing={3}>
        <TextField 
        name='categoryName' 
        label='Category Name'  
        onChange={handleChange}></TextField>
        
        <TextField 
        name='description' 
        label='Description' 
        onChange={handleChange} ></TextField>
        
        <Button onClick={handleClick} variant='contained'>Add</Button>

        

      </Stack>
    </Box>
  );
}
