import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authAction";
import AuthService from "../../services/AuthService";
export default function Login() {

  const {user} = useSelector(state => state.auth)
  const authDispatch = useDispatch();


  
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      const authService = new AuthService();
      const resp = await authService.login(values);
      console.log(resp);
      if(resp.status===200){
        authDispatch(login(resp));
      }
    },
  });


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input id='userName' name='userName' type='text' onChange={handleChange} />
        <input id='password' name='password' type='password' onChange={handleChange} />
        <input type='submit' value='login'></input>
      </form>
      {JSON.stringify(values)}
    </div>
  );
}
