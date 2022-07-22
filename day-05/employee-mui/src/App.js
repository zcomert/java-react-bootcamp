import { useEffect, useState } from "react";
import EmployeeService from "./services/EmployeeService";
import Topmenu from "./components/Topmenu";
import Search from "./components/Search";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";



function App() {
  const employeeService = new EmployeeService();
  const [refresh, setRefresh] = useState(false);
  const [employees, setEmployees] = useState([]);
  
  useEffect(() => {
    employeeService.getAllEmployees().then((resp) => setEmployees(resp.data));
  }, [refresh]);

  return (
    <div>
      <Topmenu />
      <Search />
      <EmployeeList 
        employees={employees} 
        setRefresh = {setRefresh}
        refresh = {refresh} />
      <EmployeeAdd />
    </div>
  );
}

export default App;
