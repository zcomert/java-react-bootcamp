import React,{useEffect} from 'react'
import {useSelector, useDispatch} from "react-redux";
import {getAllCategories} from "../../store/actions/categoryActions";

export default function ListCategory() {
  const {categories} = useSelector(state => state.category);
  const categoryDispatch = useDispatch();

  useEffect(() => {
    categoryDispatch(getAllCategories())
  },[]);

  return (
    <div>
      ListCategory
      
      <div>{categories.length}</div>
     
    </div>
  )
}
