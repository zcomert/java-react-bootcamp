import Grid from "@mui/material/Grid";
import React from "react";
import { useSelector } from "react-redux";
import BookCard from "./BookCard";

export default function BookCardList() {
  const { books } = useSelector((state) => state.book);
  return (
    <div>
      <Grid sx={{mt:3, padding: 2}} container spacing={3}>
        {books?.map((book) => (
          <Grid spacing={3} item xs={8} md={5} lg={4}>
            <BookCard key={book.id} book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
