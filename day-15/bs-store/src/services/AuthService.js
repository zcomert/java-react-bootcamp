import axios from "axios";

class AuthService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/auth`;
  }

  async login(body) {
    const url = `${this.baseUrl}/login`;

    return await axios
      .post(url, body)
      .then((reps) => reps.data)
      .catch((err) => err.response.status);
  }
}

export default AuthService;
