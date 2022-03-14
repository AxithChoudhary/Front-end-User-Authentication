import React,{useState} from 'react'
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


function SignUp() {
    const [userRegistration,setUserRegistration]=useState({
        name:"",
        email:'',
        password:"",
        confPassword:''
    })

    const userDetail=(e)=>{
        const type=e.target.name
        const value=e.target.value
        setUserRegistration({...userRegistration,[type]:value})
    }
    const navigate = useNavigate();
    const [error,setError]=useState("")

    const submit=async (e)=>{
        setError("")
        e.preventDefault()
        console.log("submit")
        const newRecord={...userRegistration}

        if (newRecord.name===""){
            setError("name is empty")
        }
        else if (newRecord.email===''){
            setError("email is empty")
        }
        else if(newRecord.password===""){
            setError("password is empty")
        }
        else if(newRecord.password.length<6){
            setError("password should pe atleast of 6")
        }
        else if(newRecord.name.length<6){
            setError("name should pe atleast of 6")
        }
        else if(userRegistration.password!==userRegistration.confPassword){
            setError("password doesn't matched")
        }
        else{
            try {
                delete newRecord.confPassword
                const response = await axios.post(
                "https://user-auth-apii.herokuapp.com/api/v1/register",
                newRecord);
                console.log(response)
                navigate("/home");
                
            } catch(err){
                setError("oops!something went wrong try again later")
            }

        }
    }

  return (
    <div>
        <div className='login'>
        <form onSubmit={submit}>
            <h1>Sign Up</h1>
            <p className='error-dialogbox'>{error}</p><br/>
                <div className='login-details'>
                    <label htmlFor='name' className='loginLabel' >Name</label><br />
                    <input type='text' value={userDetail.value} name="name" placeholder='Enter Name' onChange={userDetail}></input><br />
                    <label htmlFor='email' className='loginLabel'>Email</label><br />
                    <input type='email' value={userDetail.email} name="email" placeholder='Enter Email' onChange={userDetail}></input><br />
                    <label htmlFor='password' className='loginLabel'>Password</label><br />
                    <input type='password' value={userDetail.password} name="password" placeholder='Enter Password' onChange={userDetail}></input><br />
                    <label htmlFor='password' className='loginLabel'>Conform Password</label><br />
                    <input type='password' value={userDetail.confPassword} name="confPassword" placeholder='Enter Password again' onChange={userDetail}></input><br />  
                    <button className='register-btn' type='submit'>Register</button>
                </div>
        </form>
        
        </div>
        
    </div>
  )
}

export default SignUp