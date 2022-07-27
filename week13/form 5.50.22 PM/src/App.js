import './App.css';
import {useFormik} from 'formik';

function App() {
  
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
  onSubmit: values => {
    console.log('form:', values);
  }
  })
  
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>Name</div>
        <input name="name" type="text" onChange={formik.handleChange} value = {formik.values.name}></input>
        <div>Email</div>
        <input name="email" type="text" onChange={formik.handleChange} value= {formik.values.email}></input>
        <div>Password</div>
        <input name="password" type="password" onChange={formik.handleChange} value = {formik.values.password}></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
