import axios from "axios";

const getAllEmployees = async () => {
  const url = "http://localhost:8080/api/employees";
  const { data, status } = await axios.get(url).then((resp) => resp);
  return { data, status };
};

const getOneEmployee = async (id) => {
  // Templete Literal
  const url = `http://localhost:8080/api/employees/${id}`;
  const { data, status } = await axios.get(url).then((resp) => resp);
  return { data, status };
};

const postOneEmployee = async (body) => {
  const url = "http://localhost:8080/api/employees";
  const { status, data } = await axios.post(url, body).then((resp) => resp);
  return { status, data };
};

const putOneEmployee = async (id, body) => {
  const url = `http://localhost:8080/api/employees/${id}`;
  const { status, data } = await axios.put(url, body).then((resp) => resp);
  return { status, data };
};

const deleteOneEmployee = async (id) => {
  const url = `http://localhost:8080/api/employees/${id}`;
  const { status } = await axios.delete(url).then((resp) => resp);
  return { status };
};

// const result = await getAllEmployees();
// const result = await getOneEmployee(3);

const body = {
  firstName: "Emin",
  lastName: "Kara",
};

// const result = await postOneEmployee(body);
// const result = await putOneEmployee(5,body);
const result = await deleteOneEmployee(5);
console.log(result);
