import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import AddAuthor from "./AddAuthor";
import AddIcon from "@mui/icons-material/Add";
import { Avatar, Button, ButtonGroup, Fab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import SimpleFab from "../../components/fab/SimpleFab";

export default function ListAuthor() {
  const { theme, pageSize } = useSelector((state) => state.setting);
  const { authors, setAuthors, isLoading, setIsLoading } =
    React.useContext(AppContext);
  const navigate = useNavigate();

  const removeAuthor = (id) => {
    // let arr = [];

    // for(const author of authors){
    //     if(author.id!==id){
    //       arr.push(author);
    //     }
    // }
    // setAuthors(arr);

    // ACTION

    setIsLoading(true);

    const url = `http://localhost:8080/api/v1/authors/${id}`;
    console.log(url);

    axios
      .delete(url)
      .then((resp) => resp.data)
      .then((resp) => {
        let afterRemove = authors.filter((author) => author.id !== id);
        setAuthors(afterRemove);
      })
      .catch((err) => console.error("DELETE ERROR", err));

    setIsLoading(false);
  };

  

  return (
    <div>
      <SimpleFab url="/admin/authors/add" />

      <TableContainer sx={{ m: 1, p: 1 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Id</TableCell>
              <TableCell align='left'>Image</TableCell>
              <TableCell align='left'>First name</TableCell>
              <TableCell align='left'>Last namee</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors.map((author) => (
              <TableRow
                key={author.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {author.id}
                </TableCell>
                <TableCell align='left'>
                  <Avatar src={`/authors/${author.id%20}.jpg`}></Avatar>
                </TableCell>
                <TableCell align='left'>{author.firstName}</TableCell>
                <TableCell align='left'>{author.lastName}</TableCell>
                <TableCell align='left'>{author.email}</TableCell>
                <TableCell align='center'>
                  <ButtonGroup orientation='vertical'>
                    <Button>Edit</Button>
                    <Button onClick={() => removeAuthor(author.id)}>
                      Remove
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography align='center' gutterBottom variant='body1'>
        The number of {authors.length}.
      </Typography>
    </div>
  );
}
