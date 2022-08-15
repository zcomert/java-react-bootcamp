import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../store/actions/categoryActions";
import CategoryCard from "./CategoryCard";


export default function CategoryCardList() {
  const { categories } = useSelector((state) => state.category);
  const categoryDispatch = useDispatch();

  useEffect(() => {
    categoryDispatch(getAllCategories());
  }, []);

  return (
    <div>
      <Grid sx={{ mt: 3, padding: 2 }} container spacing={3}>
        {categories?.map((category) => (
          <Grid spacing={3} item xs={8} md={5} lg={4}>
            <CategoryCard key={category.id} category={category} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
