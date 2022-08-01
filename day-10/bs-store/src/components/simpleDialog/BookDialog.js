import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogActions, DialogContent, DialogContentText } from "@mui/material";
import BookService from "../../services/BookService";

import { useSelector, useDispatch } from "react-redux";
import { deleteOneBook, getAllBooks } from "../../store/actions/bookActions";
import { showDiaglog } from "../../store/initialValues/settingItems";
import { openDialog } from "../../store/actions/settingActions";



function RemoveBookDialog(props) {
  const {showDialog} = useSelector(state => state.setting);
  const bookDispatch = useDispatch();
  const { onClose, open, bookId } = props;

  const handleClose = () => {
    onClose();
  };

  const handleAggree = () => {
    bookDispatch(deleteOneBook(bookId));
    bookDispatch(openDialog(false));
    handleClose();
  };

  return (
    <Dialog
      aria-labelledby='responsive-dialog-title'
      fullScreen={false}
      onClose={handleClose}
      open={showDialog}
    >
      <DialogTitle id='responsive-dialog-title'>
        Do you want to remove this book?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please do not forget that this operation can't be restore.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={() => handleAggree(props.bookId)} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RemoveBookDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  bookId: PropTypes.number,
};

function BookDialog({ bookId }) {
  const handleClose = (value) => {
    // bookDispatch(openDialog(false));
  };
  return (
    <div>
      <RemoveBookDialog open={showDiaglog} onClose={handleClose} bookId={bookId} />
    </div>
  );
}

export default BookDialog;
