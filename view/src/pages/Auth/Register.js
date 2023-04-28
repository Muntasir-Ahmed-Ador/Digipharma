import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

const Register = () => {
    const [username,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [answer,setAnswer] = useState("");
    const navigate = useNavigate();

    // handle form submission
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{username,email,password,answer})
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate('/login');
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }
  return (
    <Layout title={"Register"}>
        <div className="register">
            <h1 className='mb-5'>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="InputName" className="form-label">Name</label>
                <input value={username} onChange={(e) =>setName(e.target.value)} type="text" className="form-control" id="InputName" aria-describedby="nameHelp" required />
                </div>
                <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">Email address</label>
                <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">Password</label>
                <input value={password} onChange={(e) =>setPassword(e.target.value)} type="password" className="form-control" id="InputPassword" required />
                </div>
                <div className="mb-3">
                <label htmlFor="InputAnswer" className="form-label">What is your birth year</label>
                <input value={answer} onChange={(e) =>setAnswer(e.target.value)} type="text" className="form-control" id="InputAnswer" aria-describedby="nameHelp" required />
                </div>
                <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="checkBox" />
                <label className="form-check-label" htmlFor="checkBox">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    </Layout>
  )
}

export default Register