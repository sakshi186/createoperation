import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FileUpload from './FileUpload';

const config = require('../config.json')
//rfc react functional component
export default function Login() {
    //1. states/hook variables
    const [data2,setData2]=useState({//json object p:v
      identifier:'s1@gmail.com',
      password:'s1@gmail.com'
    })

    const [user,setUser]=useState({
      user:null,
      is_loggedin:true
    })

    useEffect(()=>{
      //get the local storage value
      try {
        let user=JSON.parse(localStorage.getItem('user'))
        if(user){
          //logged in
          setUser({
            ...user,
            is_loggedin:true
          })
        }
        else{
          //not logged in
          setUser({
            ...user,
            is_loggedin:false
          })
        }
      } catch (error) {
        
      }
      //alert("page loaded successfully")
    },[])

    //2.functions
    let logOut=()=>{
      console.log("okok")
      //now remove the local storage value
      localStorage.removeItem('user')
      //window.location.replace('/')  pure java script
      localStorage.clear();
      }


    let handleChange=(e)=>{
      console.log();
      if(e.target.classList.contains("s_username")){
        //username
        console.log(e.target.value)
        setData2({
          //get the previous value and place here
          ...data2,
          //now set the value of key/property
          identifier:e.target.value
        })
        console.log("username block");
      }
      if(e.target.classList.contains("s_password")){
        //password
        setData2({
          //get the previous value and place here
          ...data2,
          //now set the value of key/property
          password:e.target.value
        })
        console.log("password block");
      }
    }
    let login = async (e)=>{
      e.preventDefault()
      console.log(data2);
      console.log("ok")
      try {
          let { data } = await axios.post(`${config.dev_api_url}/api/auth/local`, {
            identifier: data2.identifier,
            password: data2.password,
          });
          console.log(data);
          setUser({
            //get the previous data and place here
            ...user,
            //now set the new data
            is_loggedin:true
          })
    
          localStorage.setItem('user',JSON.stringify(data))
     }catch (error) {
        console.log(error);
      }
      //await always returns promise object
    }
    
    //3.return statements jsx
  return (
    <>
    <div className='row'>
        <div className='col-6 offset-3 pt-5'>

          {user.is_loggedin > 0 ||
          <>
                <h1 className='text-center'>Login Form</h1>
                <form onSubmit={ (e)=>{login(e)}}>
                      <div className="mb-3">
                          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                          <input type="email" className="form-control s_username" name="identifier" onChange={(e)=>{handleChange(e)}} id="exampleInputEmail1" aria-describedby="emailHelp" />
                          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                      </div>
                      <div className="mb-3">
                          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                          <input type="password" className="form-control s_password" name="password" onChange={(e)=>{handleChange(e)}} id="exampleInputPassword1" />
                      </div>
                      <button type="submit" className="btn btn-primary">Submit</button>
                </form>
           </>
          }
        </div>
    </div>
    {
      user.is_loggedin && 
      <>
        <button onClick={()=>{logOut()}} className='btn btn-success text-center'>LogOut</button>
         <FileUpload/>
      </>
    
    }
    </> 
    
         )
}
