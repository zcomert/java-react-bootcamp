import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOneCategory, getAllCategories } from "../../store/actions/categoryActions";


import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { showSnackbar } from "../../store/actions/settingActions";
import SimpleFab from "../../components/fab/SimpleFab";
import AddIcon from "@mui/icons-material/Add";

export default function ListCategory() {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const categoryDispatch = useDispatch();

  const handleRemove = (id) => {
    categoryDispatch(deleteOneCategory(id));
    categoryDispatch(showSnackbar({
      message:"Category has been removed.",
      open:true
    }));
  }

  const handleEdit = (id) => {
    navigate(`/admin/categories/update/${id}`);
  }

  useEffect(() => {
    categoryDispatch(getAllCategories());
  }, []);

  

  return (
    <>
     <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => {
              const { id, categoryName, description } = category;
              return (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{categoryName}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>
                    <ButtonGroup orientation="vertical" >
                      <Button onClick={() => handleEdit(id)}>Edit</Button>
                      <Button onClick={()=> handleRemove(id)} >Remove</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleFab url="/admin/categories/add" />
    </>
  );
}
