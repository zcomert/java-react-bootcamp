import axios from "axios";

class EmployeeService{
    constructor(){
        this.baseUrl = "http://localhost:8080/api/employees";
    }

    async getAllEmployees(){
        const {data, status} = await axios.get(this.baseUrl).then(resp => resp);
        return {data, status};
    }

    async deleteOneEmployee(id){
        let url = `${this.baseUrl}/${id}`;
        const {status} = await axios.delete(url).then(resp => resp);
        return status;
    }

    async postOneEmployee(body){
        const {status, data} = await axios.post(this.baseUrl,body)
        .then(resp=> resp);
        return {status,data};
    }

    async getSearch(q){
        const url = `${this.baseUrl}/search?q=${q}`;
        const {status, data} = await axios.get(url)
        .then(resp => resp)
        .catch(err => console.error(err));
        return {status, data};
    }
}

export default EmployeeService;