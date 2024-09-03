import React, {useState} from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword, signinCredentials, verifyEmail } from '../../reducers/userAuthReducer';
import {useSelector, useDispatch} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import fphoto from '../../assets/ForgotPassword.png'

const ForgotPassword = () => {
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')

    const forgotPasswordEmail = (e) => {
        e.preventDefault()

        const rgExp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
        if(email === "") return toast("Please enter your email")
        if(!rgExp.test(email)) return toast("Please enter valid email");

        const form = {
            email
        }

        dispatch(forgotPassword(form))
        .then((result) => {
            if(result.type === 'forgotPassword/fulfilled') toast("Check your entered email for reset link!")
            else toast("Either email is not registered or try after some time")
        })
    }

  return (
    <Layout footer>
        <div className='text-white md:flex'>
            <div className='w-[50%] bg-[#8F00FF] h-[92vh] hidden md:block'>
                <img className='w-[100%] h-[100%] object-cover' src={fphoto} alt="forgotpassword" />
            </div>
            <div className='md:w-[50%]'>
                <div className='flex flex-col col-span-1 justify-center items-center md:p-8 mt-8 p-4'>
                    <div className='flext flex-col justify-start md:w-96'>
                        <div className='text-[#4db5ff]'>Oh!</div>
                        <h1 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Forgot Password!</h1>
                    </div>

                    <form action="" className='flex flex-col justify-start mt-4 md:w-[376px] w-[298px]'>
                        <div className='w-full'>
                            <div>
                                <label htmlFor="" className='text-gray-500 pb-1 text-sm '>
                                    Enter Your Email
                                    <strong className='text-red-600 font-normal m-[1px]'>*</strong>
                                </label>
                            </div>
                            <div className='mt-1'>
                                <input type="email" placeholder='Enter Email' className={`h-14 text-[11px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                        </div>
                        <button className='btn btn-primary md:w-[376px] sm:w-[298px]' onClick={forgotPasswordEmail} disabled={auth.authenticating}>
                            {
                                auth.authenticating ?
                                <div id='loader' className='w-full mx-auto'></div>
                                : "Request"
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
        <ToastContainer
            theme='dark'
        />
    </Layout>
  )
}

export default ForgotPassword