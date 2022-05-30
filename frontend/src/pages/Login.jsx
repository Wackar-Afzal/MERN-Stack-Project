import { useState,useEffect } from "react";
import {FaSignInAlt} from "react-icons/fa";

const Login = () => {
  const [formData,setformData]=useState({
    email:"",
    password:"",
  })

  const {email,password}=formData;

  // ....................................................onChange Function ,called when user change info form..............................
const onChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
}
  // ....................................................onSubmit function,called when form is submitted...................................
  const onSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <>
      <section className="heading">
        <h1><FaSignInAlt/> Login</h1>
        <p>Login and start settings goals</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
           <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter a password" onChange={onChange}/>
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-block" onChange={onChange}>Login</button>
          </div>
        </form>      
      </section>
    </>
  )
}

export default Login