import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import EmployeeService from "../services/EmployeeService";
import EmployeeList from "./EmployeeList";

export default function Search({ setEmployees }) {
 
  const employeeService = new EmployeeService();

  const handleSearch = (e) => {
    employeeService
      .getSearch(e.target.value)
      .then((resp) => {
        setEmployees(resp.data);
      });
  };
  return (
    <Box
      sx={{
        m: 2,
        maxWidth: "100%",
      }}
    >
      <TextField
        fullWidth
        label='Search'
        onChange={(e) => handleSearch(e)}
        id='fullWidth'
      />

      

      {/* {JSON.stringify(employees)} */}
    </Box>
  );
}
