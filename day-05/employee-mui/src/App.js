import { useEffect, useState } from "react";
import EmployeeService from "./services/EmployeeService";
import Topmenu from "./components/Topmenu";
import Search from "./components/Search";
import EmployeeList from "./components/EmployeeList";
import EmployeeAdd from "./components/EmployeeAdd";
import { Grid } from "@mui/material";

function App() {
  const employeeService = new EmployeeService();
  const [refresh, setRefresh] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    employeeService.getAllEmployees().then((resp) => setEmployees(resp.data));
  }, [refresh]);

  return (
    <Grid fluid>
      <Grid item>
        <Topmenu />
        <Search
        setEmployees={setEmployees}
        setRefresh={setRefresh}
        refresh={refresh}
        />
        <Grid container>
          <Grid item xs={8}>
            <EmployeeList
              employees={employees}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          </Grid>
          <Grid item xs={4}>
            <EmployeeAdd setRefresh={setRefresh} refresh={refresh} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
