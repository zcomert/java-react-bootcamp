import React from "react";
import { useNavigate,Link } from "react-router-dom";

export default function List() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
  
    <>
      <div>Author List</div>
      <button onClick={handleClick} >go home</button>
    </>
  );
}
