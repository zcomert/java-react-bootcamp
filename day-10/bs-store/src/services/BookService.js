import axios from "axios";

class BookService{
    constructor(){
        this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/books`;
        console.log(this.baseUrl);
    }

    async getAllBooks(){
        return await axios
        .get(this.baseUrl,{
            headers:{
                'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJib29rOmRlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoiYm9vazpwb3N0In0seyJhdXRob3JpdHkiOiJib29rOmdldCJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9LHsiYXV0aG9yaXR5IjoiYm9vazpwdXQifV0sImlhdCI6MTY1OTQ2NTA4MiwiZXhwIjoxNjU5NDY4NjgyfQ.VED0vLYOAJXu3IEVlA6RFN2aOw3vPUB655yaLptSgIXeyWkX9Sfg23X2CoJVgnQ-xpdMjdOO-9mwGy7yn4NIrg'
            }
        })
        .then(resp => resp.data)
        .catch(err => console.log(err.status));
    }

    async getOneBook(id){
        const url = `${this.baseUrl}/${id}`;
        return await axios.get(url).then(resp => resp.data);
    }

    async postOneBook(payload){
        console.log(this.baseUrl)
        console.log(payload)
        return await axios.post(this.baseUrl,payload).then(resp => resp.data);
    }

    async deleteOneBook(id){
        const url = `${this.baseUrl}/${id}`;
        await axios.delete(url).then(resp => resp.status);
    }
}

export default BookService;