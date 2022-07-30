import React, { useEffect } from "react";
import AppContext from "../../context/AppContext";
import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonGroup, Fab, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useSelector, useDispatch } from "react-redux";
import {
  deleteOneAuthor,
  getAllAuthors,
} from "../../store/actions/authorActions";

export default function ListAuthor() {
  const { authors } = useSelector((state) => state.author);
  const authorDispatch = useDispatch();
  const { isLoading, setIsLoading } = React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    authorDispatch(getAllAuthors());
  }, []);

  const removeAuthor = (id) => {
    authorDispatch(deleteOneAuthor(id));
  };

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
    <div>
      <Fab
        sx={fab.sx}
        aria-label={fab.label}
        onClick={() => navigate("/admin/authors/add")}
        color={fab.color}
      >
        {fab.icon}
      </Fab>

      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Id</TableCell>
              <TableCell align='left'>First name</TableCell>
              <TableCell align='left'>Last namee</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='center'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((author, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {author.id}
                </TableCell>
                <TableCell align='left'>{author.firstName}</TableCell>
                <TableCell align='left'>{author.lastName}</TableCell>
                <TableCell align='left'>{author.email}</TableCell>
                <TableCell align='center'>
                  <ButtonGroup orientation='vertical'>
                    <Button
                      onClick={() =>
                        navigate(`/admin/authors/update/${author.id}`)
                      }
                    >
                      Edit
                    </Button>
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
        The number of {authors?.length}.
      </Typography>
    </div>
  );
}
