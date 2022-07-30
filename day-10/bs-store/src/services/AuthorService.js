import axios from "axios";

class AuthorService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/authors`;
  }

  async getAllAuthors() {
    return await axios
      .get(this.baseUrl)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
  }

  async getOneAuthor(id) {
    const url = `${this.baseUrl}/${id}`;
    return await axios
      .get(url)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
  }

  async postOneAuthor(payload) {
    return axios
      .post(this.baseUrl, payload)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
  }

  async putOneAuthor(id, payload) {
    const url = `${this.baseUrl}/${id}`;
    return axios
      .put(url, payload)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
  }

  async deleteOneAuthor(id) {
    const url = `${this.baseUrl}/${id}`;
    return await axios.delete(url).then((resp) => resp);
  }
}

export default AuthorService;
