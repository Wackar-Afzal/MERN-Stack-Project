import { useState,useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {register,reset} from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {FaUser} from "react-icons/fa";

const Register = () => {
  const [formData,setformData]=useState({
    name:"",
    email:"",
    password:"",
    password2:"",
  })

  const {name,email,password,password2}=formData;

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
    if(password!==password2){
      toast.error("password do not match")
    }else{
      const userData={
        name,
        email,
        password,
      }
      dispatch(register(userData))
      // console.log(userData)
    }

    if(isloading){
      return <Spinner/>
    }
  }


  return (
    <>
      <section className="heading">
        <h1><FaUser/> Register</h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
           <input type="text" className="form-control" id="name" name="name" value={name} placeholder="Enter your name" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Create a password" onChange={onChange}/>
          </div>
          <div className="form-group">
           <input type="password" className="form-control" id="password2" name="password2" value={password2} placeholder="Confirm your password" onChange={onChange}/>
          </div>
          <div className="form-group">
           <button type="submit" className="btn btn-block" onChange={onChange}>Register</button>
          </div>
        </form>      
      </section>
    </>
  )
}

export default Register