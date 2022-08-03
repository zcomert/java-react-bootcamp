import axios from "axios";

class BookService{
    constructor(){
        this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/books`;
    }

    async getAllBooks(){
        return await axios.get(this.baseUrl).then(resp => resp.data);
    }

    async getOneBook(id){
        const url = `${this.baseUrl}/${id}`;
        return await axios.get(url).then(resp => resp.data);
    }

    async postOneBook(payload){
        return await axios.post(this.baseUrl,payload).then(resp => resp.data);
    }

    async putOneBook(id,payload){
        const url = `${this.baseUrl}/${id}`;
        return await axios.put(url,payload).then(resp => resp.data);
    }

    async deleteOneBook(id){
        const url = `${this.baseUrl}/${id}`;
        await axios.delete(url).then(resp => resp);
    }
}

export default BookService;