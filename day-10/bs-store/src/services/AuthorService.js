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

  async postOneAuthor(payload) {
    return await axios
      .post(this.baseUrl, payload)
      .then((resp) => resp.data)
      .catch((err) => console.log(err));
  }
}

export default AuthorService;
