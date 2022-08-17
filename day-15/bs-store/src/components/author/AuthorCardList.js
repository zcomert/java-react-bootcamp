import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAuthors } from "../../store/actions/authorActions";
import AuthorCard from "./AuthorCard";


export default function AuthorCardList() {
  const { authors } = useSelector((state) => state.author);
  const authorDispatch = useDispatch();

  useEffect(() => {
    authorDispatch(getAllAuthors());
  }, []);

  return (
    <div>
      <Grid sx={{ mt: 1, padding: 1 }} container spacing={1}>
        {authors?.map((author) => (
          <Grid spacing={1} item xs={5} md={3} lg={2}>
            <AuthorCard key={author.id} author={author}></AuthorCard>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
