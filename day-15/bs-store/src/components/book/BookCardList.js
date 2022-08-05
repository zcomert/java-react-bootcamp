import Grid from "@mui/material/Grid";
import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

export default function BookCardList() {
  const { books } = useSelector((state) => state.book);
  return (
    <div>
      <Grid sx={{mt:3}} container spacing={3}>
        {books?.map((book) => (
          <Grid spacing={3} item xs={6} md={4} lg={3}>
            <BookCard key={book.id} book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
