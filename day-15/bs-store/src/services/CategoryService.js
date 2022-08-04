import axios from "axios";

class CategoryService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/categories`;
  }

  async getAllCategories() {
    return await axios.get(this.baseUrl).then((resp) => resp.data);
  }

  async getOneCategory(id){
    const url = `${this.baseUrl}/${id}`;
    return await axios.get(url).then((resp) => resp.data);
  }

  async deleteOneCategory(id) {
    const url = `${this.baseUrl}/${id}`;
    return await axios.delete(url,{
      headers:{
        'Authorization': localStorage?.getItem('accessToken')
      }
    })
    .then((resp) => resp)
    .catch(err => err.response.status);
  }

  async postOneCategory(category) {
    return await axios.post(this.baseUrl, category).then((resp) => resp.data);
  }

  async putOneCategory(id,category){
    const url = `${this.baseUrl}/${id}`;
    console.log(url)
    return await axios.put(url,category).then(resp => resp.data);
  }

  
}

export default CategoryService;
