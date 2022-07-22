import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";

export default function EmployeeList({employees,setRefresh,refresh}) {
  
  
  const employeeService = new EmployeeService();
  
  const handleDelete = (id) => {
    let temp = false;
    console.log("delete", id);
    employeeService.deleteOneEmployee(id).then((resp) => {
      console.log(resp);
      setRefresh(!refresh);
    });
  };

  

  return (
    <div>
      EmployeeList {employees.length}
      {employees.map((emp) => (
        <div key={emp.id}>
          {`${emp.firstName} ${emp.lastName}`}
          <button onClick={() => handleDelete(emp.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
