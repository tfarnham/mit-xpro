import React from "react";
import {useFormik} from 'formik';

function App() {
  
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
  onSubmit: values => {
    console.log('form:', values);
  },
  validate: values => {
    let errors = {};
    if(!values.email) errors.email = "Required";
    if(!values.password) errors.password = "RequiredP";
    return errors;

  }
  })
  
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>Email</div>
        <input id="emailField" name="email" type="text" onChange={formik.handleChange} value= {formik.values.email}></input>
        {formik.errors.email ? <div style={{color:'red'}} id="emailError">{formik.errors.email}</div>:null}
        <div>Password</div>
        <input id="pswField" name="password" type="text" onChange={formik.handleChange} value = {formik.values.password}></input>
        {formik.errors.password ? <div style={{color:'red'}} id="pswError">{formik.errors.password}</div>:null}
        <div></div><button id="submitBtn" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;