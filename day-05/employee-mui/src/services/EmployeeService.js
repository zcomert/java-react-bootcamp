import axios from "axios";

class EmployeeService{
    constructor(){
        this.baseUrl = "http://localhost:8080/api/employees";
    }

    async getAllEmployees(){
        const {data, status} = await axios.get(this.baseUrl).then(resp => resp);
        return {data, status};
    }
}

export default EmployeeService;