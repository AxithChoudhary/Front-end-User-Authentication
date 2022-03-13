import React,{useState} from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function LogIn() {
    const [userLogIn,setUserLogIn]=useState({
        email:'',
        password:"",
    })
    const navigate = useNavigate();
    const [error,setError]=useState("")
    const userDetail=(e)=>{
        const type=e.target.name
        const value=e.target.value
        setUserLogIn({...userLogIn,[type]:value})
    }

    const submit=async (e)=>{
        e.preventDefault()
        console.log("Submit")
        const newRecord={...userLogIn}
        if (newRecord.email===''){
            console.log("Email is empty")
        }
        if(newRecord.password===""){
            console.log("Password is empty")
        }
        if(newRecord.password.length<6){
            console.log("Incorrect password")
        }
        else{
            try {
                delete newRecord.confPassword
                const response = await axios.post(
                "https://user-auth-apii.herokuapp.com/api/v1/login",
                newRecord);
                console.log(response)
                Navigate("/home"); 
            } catch(err){
                setError("oops!something went wrong try again later")
            }

        }
    }

  return (
    <div >
        <div className='login'>
            <form onSubmit={submit}>
                <h1>Login</h1>
                <p className='error-dialogbox'>{error}</p><br/>
                <div className='login-details'>
                    <label className='loginLabel' htmlFor='email'>Email</label><br />
                    <input type='email' value={userDetail.email} name="email" placeholder='Enter Email' onChange={userDetail}></input><br />
                    <label className='loginLabel' htmlFor='password'>Password</label><br />
                    <input type='password' value={userDetail.password} name="password" placeholder='Enter Password' onChange={userDetail}></input><br />
                    <button type='submit' className='register-btn'>Login</button>
                </div>
            </form>
            <p>
                    Don't have an account?{" "}
                    <button className="redirect" onClick={() => navigate("/signup")}>
                        Sign Up
                    </button>
            </p>
        </div>
    </div>
  )

}

export default LogIn