import { useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import AuthorList from "../../components/authors/AuthorList";
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../../store/actions/bookActions";
import SimpleFab from "../../components/fab/SimpleFab";

export default function ListBook() {
  const {books} = useSelector((state) => state.book);
  const bookDispatch = useDispatch(); 
  const navigate = useNavigate();

  useEffect(() => {
    bookDispatch(getAllBooks());
  },[])


  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Images</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Authors</TableCell> 
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => {
              const {id, title, category, bookAuthors} = book
              return (
                <TableRow key={index}>
                  <TableCell>{id}</TableCell>
                  <TableCell>
                    <Avatar alt={title} src={`/books/${id}.jpg`} />
                  </TableCell>
                  <TableCell>{title}</TableCell>
                  <TableCell><AuthorList authors={bookAuthors} /> </TableCell>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell>
                    <ButtonGroup orientation="vertical">
                      <Button onClick={() => navigate(`/books/edit/${id}`)} >Edit</Button>
                      <Button>Remove</Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <SimpleFab backUrl="/admin/books/add" iconType="new" />
    </Box>
  );
}
