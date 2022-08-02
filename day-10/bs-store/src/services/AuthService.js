import axios from "axios";

class AuthService {
  constructor() {
    this.baseUrl = `${process.env.REACT_APP_BASE_ENDPOINT}/auth`;
  }

  async login(login) {
    const url  = `${this.baseUrl}/login`
    console.log(url)
    return await axios.post(url,login).then((resp) => resp);
  }
}

export default AuthService;
