import React from 'react'
import { Link } from 'react-router-dom';
export default function TopLink() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/author/add">Add</Link>
      <Link to="/author/list">List</Link>
      <Link to="/author/put">Put</Link>
    </div>
  )
}
