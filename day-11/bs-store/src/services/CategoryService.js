import axios from "axios";

class CategoryService{
    constructor(){
        this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/categories`;
    }

    async getAllCategories() {
        return await axios.get(this.baseUrl)
        .then(resp => resp.data);
    }
}

export default CategoryService;