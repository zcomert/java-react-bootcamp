import React from 'react'
import {useSelector} from "react-redux";

export default function ListCategory() {
  const {theme, pageSize} = useSelector(state => state.setting);
  return (
    <div>
      ListCategory
      
      <div>{theme}</div>
      <div>{pageSize}</div>
    </div>
  )
}
