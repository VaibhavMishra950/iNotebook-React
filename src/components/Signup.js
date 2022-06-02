import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  document.title = "Register - iNotebook"

  const refName = useRef(null);
  const refEmail = useRef(null);
  const refPassword = useRef(null)
  const refConPassword = useRef(null)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tmpData = { name: refName.current.value, email: refEmail.current.value, password: refPassword.current.value, cpassword: refConPassword.current.value };
    if (tmpData.password === tmpData.cpassword) {
      let url = `http://localhost:5000/api/auth/createUser`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: tmpData.name, email: tmpData.email, password: tmpData.password })
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        localStorage.setItem('token', data.authToken);
        props.showAlert("success", "Registered Succesfully", "fa-solid fa-circle-check")
        navigate("/")
      }
      else {
        props.showAlert("error", data.error, "fa-solid fa-circle-xmark")
      }
    }
    else{
      props.showAlert("error", "Passwords Should Be Same", "fa-solid fa-circle-xmark")
    }
  }


  return (
    <div className='container my-3'>
      <h2>Create an account to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" ref={refName} className="form-control" id="name" name='name' required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" ref={refEmail} className="form-control" id="email" name='email' required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" ref={refPassword} className="form-control" id="password" name='password' min={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" ref={refConPassword} className="form-control" id="cpassword" name='cpassword' min={8} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup