import React, { useState, useEffect } from "react";
import EmployeeService from "../services/EmployeeService";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const employeeService = new EmployeeService();

  useEffect(() => {
    employeeService.getAllEmployees().then((resp) => setEmployees(resp.data));
  }, []);

  return (
    <div>
      EmployeeList {employees.length}
      {employees.map(emp => (
        <div key={emp.id}>
          {`${emp.firstName} ${emp.lastName}`}
          <button>Remove</button>
        </div>
      ))}
    </div>
  );
}
