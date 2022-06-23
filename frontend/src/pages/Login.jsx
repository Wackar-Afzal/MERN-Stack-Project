import { useState,useEffect } from "react";
import {FaSignInAlt} from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {login,reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData,setformData]=useState({
    email:"",
    password:"",
  })

  const {email,password}=formData;

  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user,isloading,isSucess,message,isError}=useSelector((state)=>state.auth)
  // ....................................................useEffect....................
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    if(isSucess || user){
      navigate("/")
    }

    dispatch (reset())
  } ,[user,isError,isSucess,message,navigate,dispatch])  

  // ....................................................onChange Function ,called when user change info form..............................
const onChange=(e)=>{
  setformData({...formData,[e.target.name]:e.target.value})
}
  // ....................................................onSubmit function,called when form is submitted...................................
  const onSubmit=(e)=>{
    e.preventDefault();
    const userData ={
      email, password
    }
    dispatch(login(userData))
  }
if(isloading){
  return <Spinner/>
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