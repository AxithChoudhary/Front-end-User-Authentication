import React,{useState} from 'react'
import axios from "axios";


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

    const submit=async (e)=>{
        e.preventDefault()
        console.log("submit")
        const newRecord={...userRegistration}

        if (newRecord.name===""){
            console.log("name is empty")
        }
        if (newRecord.email===''){
            console.log("email is empty")
        }
        if(newRecord.password===""){
            console.log("password is empty")
        }
        if(newRecord.password.length<6){
            console.log("password should pe atleast of 6")
        }
        if(newRecord.name.length<6){
            console.log("password should pe atleast of 6")
        }
        if(userRegistration.password!==userRegistration.confPassword){
            console.log("password doesn't matched")
        }
        else{
            try {
                delete newRecord.confPassword
                const response = await axios.post(
                "https://user-auth-apii.herokuapp.com/api/v1/register",
                newRecord);
                console.log(response)
                
            } catch(err){
                console.log(err)
            }

        }
    }

  return (
    <div>
        <form onSubmit={submit}>
        <label htmlFor='name'>Name</label>
        <input type='text' value={userDetail.value} name="name" placeholder='Enter Name' onChange={userDetail}></input>
        <label htmlFor='email'>Email</label>
        <input type='email' value={userDetail.email} name="email" placeholder='Enter Email' onChange={userDetail}></input>
        <label htmlFor='password'>Password</label>
        <input type='password' value={userDetail.password} name="password" placeholder='Enter Password' onChange={userDetail}></input>
        <label htmlFor='password'>Conform Password</label>
        <input type='password' value={userDetail.confPassword} name="confPassword" placeholder='Enter Password again' onChange={userDetail}></input>
        
        <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default SignUp