import { Avatar, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ThemeMenu from "../../components/theme/ThemeMenu";
import { setTheme } from "../../store/actions/settingActions";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getAllBooks } from "../../store/actions/bookActions";
import AuthorList from "../../components/authorList/AuthorList";

export default function ListBook() {
  const { books } = useSelector((state) => state.book);
  const bookDispatch = useDispatch();

  useEffect(() => {
    bookDispatch(getAllBooks());
  }, []);

  return (
    <>
      {books.length}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Public</TableCell>
              <TableCell>Authors</TableCell>
              <TableCell>Categories</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => {
             const {id, title, price, publisher, category, bookAuthors} = book;
              return (
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>
                    <Avatar src={`/books/${id%121}.jpg`}></Avatar>
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{publisher}</TableCell>
                  <TableCell>
                    <AuthorList authors={bookAuthors} />
                  </TableCell>
                  <TableCell>Categories</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
