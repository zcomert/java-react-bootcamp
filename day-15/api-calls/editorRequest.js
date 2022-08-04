import axios from "axios";

const url = "http://localhost:8080/api/v1/auth/users";

const body = {
  userName: "editor",
  password: "editor123456",
};

const getUsers = async () => {
  const url = "http://localhost:8080/api/v1/auth/users";
  const { status, data } = await axios.get(url);
  console.log(status);
  console.log(data);
};

const login = async () => {
  const url = "http://localhost:8080/api/v1/auth/login";
  const { status, data } = await axios.post(url, body).catch(err => console.log(err.status))
  // console.log(status);
  // console.log(data)
  if (status === 200) return data.accessToken;
  else return status;
};

const postOneCategory = async (accessToken) => {
  const url = "http://localhost:8080/api/v1/categories";

  const body = {
    categoryName: "Axios by Editor",
    description: "Api calls trying... by Editor",
  };

  const config = {
    url,
    data : body,
    method:'post',
    headers:{
      'Authorization' : accessToken
    }
  }

  const { status, data } = await axios(config).catch(err => console.log(err.status))
  console.log(status)
  console.log(data)
};

// getUsers();
let accessToken='';
accessToken = await login();
console.log(accessToken);
postOneCategory(accessToken);

