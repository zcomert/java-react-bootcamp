import axios from "axios";

class CategoryService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/categories`;
  }

  async getAllCategories() {
    return await axios.get(this.baseUrl).then((resp) => resp.data);
  }

  async deleteOneCategory(id) {
    const url = `${this.baseUrl}/${id}`;
    return await axios.delete(url).then((resp) => resp);
  }

  async postOneCategory(category) {
    return await axios.post(this.baseUrl, category).then((resp) => resp.data);
  }
}

export default CategoryService;
