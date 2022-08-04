import axios from "axios";

const url = "http://localhost:8080/api/v1/auth/users";

const body = {
  userName: "admin",
  password: "admin123456",
};

const getUsers = async () => {
  const url = "http://localhost:8080/api/v1/auth/users";
  const { status, data } = await axios.get(url);
  console.log(status);
  console.log(data);
};

const login = async () => {
  const body = {
    userName: "admin",
    password: "admin123456!",
  };

  const url = "http://localhost:8080/api/v1/auth/login";
  return await axios
    .post(url, body)
    .then((reps) => reps.data.accessToken)
    .catch((err) => err.response.status);
};

const postOneCategory = async (accessToken) => {
  const url = "http://localhost:8080/api/v1/categories";

  const body = {
    categoryName: "Axios by Admin",
    description: "Api calls trying... by Admin",
  };

  const config = {
    url,
    data: body,
    method: "post",
    headers: {
      Authorization: accessToken,
    },
  };

  const { status, data } = await axios(config).catch((err) => console.log(err));
  console.log(status);
  console.log(data);
};

// getUsers();
await login().then((resp) => {
  if (resp !== 401) {
    console.log(resp);
  } else {
    console.log("Error", resp);
  }
});

// console.log(accessToken);
// postOneCategory(accessToken);
