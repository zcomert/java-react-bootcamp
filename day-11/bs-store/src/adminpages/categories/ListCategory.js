import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteOneCategory, getAllCategories } from "../../store/actions/categoryActions";
import AddIcon from "@mui/icons-material/Add";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, ButtonGroup, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setMessage } from "../../store/actions/settingActions";

export default function ListCategory() {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.category);
  const categoryDispatch = useDispatch();

  const handleRemove = (id) => {
    categoryDispatch(deleteOneCategory(id));
    categoryDispatch(setMessage("Category has been removed."));
  }

  const handleEdit = (id) => {
    navigate(`/admin/categories/update/${id}`);
  }

  useEffect(() => {
    categoryDispatch(getAllCategories());
  }, []);

  const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
  };

  const fab = {
    color: "secondary",
    sx: fabStyle,
    icon: <AddIcon />,
    label: "Add",
  };

  return (
    <>
      <Fab
        sx={fab.sx}
        aria-label={fab.label}
        onClick={() => navigate("/admin/categories/add")}
        color={fab.color}
      >
        {fab.icon}
      </Fab>

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
    </>
  );
}
