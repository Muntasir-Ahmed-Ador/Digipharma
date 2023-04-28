import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout.js'
import axios from "axios"
import { useNavigate, useLocation } from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useAuth } from '../../context/auth.js'

const Login = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [auth,setAuth] = useAuth()

    const navigate = useNavigate();
    const location = useLocation();

    // handle form submission
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem("auth",JSON.stringify(res.data));
                navigate(location.state || "/");
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
    <Layout title={"Login"}>
        <div className="login">
            <h1 className='mb-5'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">Email address</label>
                <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">Password</label>
                <input value={password} onChange={(e) =>setPassword(e.target.value)} type="password" className="form-control" id="InputPassword" required />
                </div>
                <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="checkBox" />
                <label className="form-check-label" htmlFor="checkBox">Remember Me</label>
                </div>
                <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    </Layout>
  )
}

export default Login