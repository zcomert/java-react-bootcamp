import { useEffect, useState } from "react";
import EmployeeService from "./services/EmployeeService";
import Topmenu from "./components/Topmenu";
import Search from "./components/Search";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";

function App() {
  return (
    <div>
      <Topmenu />
      <Search />
      <EmployeeList />
      <EmployeeAdd />
    </div>
  );
}

export default App;
