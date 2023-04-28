import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-hot-toast'

const ForgotPassword = () => {
    const [email,setEmail] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [answer,setAnswer] = useState("");

    const navigate = useNavigate();

    // handle form submission
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,answer})
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                navigate("/login");
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
    <Layout title={"Forgot Password"}>
        <div className="login">
            <h1 className='mb-5'>Forgot Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="InputEmail" className="form-label">Email address</label>
                <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" required />
                </div>
                <div className="mb-3">
                <label htmlFor="InputPassword" className="form-label">New Password</label>
                <input value={newPassword} onChange={(e) =>setNewPassword(e.target.value)} type="password" className="form-control" id="InputPassword" required />
                </div>
                <div className="mb-3">
                <label className="form-label d-flex flex-column">What is your birth year</label>
                <input value={answer} onChange={(e) =>setAnswer(e.target.value)} type="text" required />
                </div>
                <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="checkBox" />
                <label className="form-check-label" htmlFor="checkBox">Remember Me</label>
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword