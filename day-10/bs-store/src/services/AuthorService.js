import axios from "axios";

class AuthorService{
    constructor(){
        this.baseUrl = "http://localhost:8080/api/v1/authors";
    }

    async getAllAuthors(){
      return  await axios.get(this.baseUrl)
        .then(resp => resp.data)
        .catch(err => console.log(err));
    }
}

export default AuthorService;