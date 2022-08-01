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
import { Button, ButtonGroup } from "@mui/material";

export default function ListCategory() {
  const { categories } = useSelector((state) => state.category);
  const categoryDispatch = useDispatch();

  const handleRemove = (id) => {
    categoryDispatch(deleteOneCategory(id));
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
                      <Button>Edit</Button>
                      <Button onClick={()=>handleRemove(id)} >Remove</Button>
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
