import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = require('../config.json')


//rfc
export default function FileUpload() {
    //1.states/hook variables
    const [file, setFile] = useState('')
    const [data, setData] = useState({
        percent:0,
        loaded:false
    })
    const [jwt, setJwt] = useState({
        token:''
    })
    useEffect(()=>{
        try {
            let user=JSON.parse(localStorage.getItem('user'))

            if(user){
              //logged in
              setJwt({
                ...jwt,
                token:user.jwt
            })
            }else
            {
              //not logged in
            }
          } catch (error) {
            
          }
    },[])

    //2.functions
    let handleChange =  (e)=>{
        console.log("changed",e[0]);
        setFile(e[0])
    }

    let uploadImage =  async (e)=>{
        e.preventDefault();
        console.log("ok")

        try {
              setData({
                percent:0,
                loaded:true
              })
              //success
              //let object = new classname();
                let data = new FormData();
                data.append('files',file)

                 let upload_response = await axios({
                        method:'POST',
                        url:`${config.dev_api_url}/api/upload`,
                        headers:{
                            'content-type':'application/json',
                            'Authorization':`Bearer ${jwt}`
                        },
                        data,
                        onUploadProgress:(progress)=>{
                            console.log(progress);
                            setData({
                                loaded:true,
                                percent:Math.round(progress.loaded / progress.total*100)
                            })
                        }
                 })
                       setData({
                           loaded:false
                       })
                       toast("file uploaded successfully")
                       console.log("file upload response",upload_response)
            
        } catch (error) {
            //error
            console.log(error);
        }

      
              
          } 
    //3.return statements (jsx)
  return (
    <>
    <div className='row'>
        <div className='col-6 offset-3'>
            <form className="mt-5" onSubmit={(e)=>{uploadImage(e) }}>
                <h1>File Upload using reactJS and axios</h1>
                <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload File</label>
                    <input onChange={ (e)=>{handleChange(e.target.files) }} type="file" accept="image/*" name="files" className="form-control" id="file"  />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {
                data.loaded &&
                <div className="progress mt-3">
                     <div className="progress-bar" role="progressbar" style={{width: data.percent+'%'}} aria-valuenow={data.percent} aria-valuemin={0} aria-valuemax={100}>{ data.percent }%</div>
                </div>
            }

            <ToastContainer />
        </div>
    </div>

    </>
  )
}

