import React, {useState} from 'react'
import Layout from '../Layout/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { signinCredentials } from '../../reducers/userAuthReducer';
import {useSelector, useDispatch} from 'react-redux'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignInPhoto from './../../assets/SignIn.png'

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const signIn = (e) => {
        e.preventDefault();
        if(email === "") return toast("Please Enter your email!")
        if(password === "") return toast("Password is of minimum 8 characters!")
        const payload = {
            email,
            password
        }

        dispatch(signinCredentials(payload))
        .then((result) => {
            console.log(result, "signin")
            if(result.payload === undefined) toast("Please enter valid credentials!");
            else 
            {
                toast("Login Success! Please wait...")
            }
        })
    }

    const credentialResponse = (response) => {
        console.log(response)
        const details = jwt_decode(response.credential);
        const payload = {
            email: details.email,
            password: details.email + details.name
        }

        dispatch(signinCredentials(payload))
        .then((result) => {
            console.log(result, "signin")
            if(result.payload === undefined) toast("Please enter valid credentials!");
            else 
            {
                toast("Login Success! Please wait...")
            }
        })
    }

    if(auth.authenticate)
    {
        setTimeout(() => {
            navigate('/myProfile')
        }, 3000);
    }

  return (
    <Layout footer>
        <div className='text-white md:flex'>
            <div className='w-[50%] bg-[#8F00FF] h-[92vh] hidden md:block relative'>
                <img className='w-[100%] h-[100%] object-cover' src={SignInPhoto} alt="Signin" />
            </div>
            <div className='md:w-[50%]'>
                <div className='flex flex-col col-span-1 justify-center items-center md:p-8 mt-8 p-4'>
                    <div className='flext flex-col justify-start md:w-96'>
                        <div className='text-[#4db5ff]'>Hey!</div>
                        <h1 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Welcome Back</h1>
                    </div>
                    {/* <p className='text-gray-500 pb-1 text-sm '>Sign in to see notes and lost/found items!</p> */}
                    <form action="" className='flex flex-col justify-start mt-4 md:w-[376px] w-[298px]'>
                        <div className='w-full'>
                            <div>
                                <label htmlFor="" className='text-gray-500 pb-1 text-sm '>
                                    Email
                                    <strong className='text-red-600 font-normal m-[1px]'>*</strong>
                                </label>
                            </div>
                            <div className='mt-1'>
                                <input type="email" placeholder='Enter your email' className={`h-14 text-[11px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>

                            <div className='mt-4'>
                                <label htmlFor="" className='text-gray-500 pb-1 text-sm '>
                                    Password
                                    <strong className='text-red-600 font-normal m-[1px]'>*</strong>
                                </label>
                            </div>
                            <div className='mt-1'>
                                <input type="password" placeholder='Enter your password' className={`h-14 text-[11px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} value={password} onChange={(e) => setPassword(e.target.value)}/>
                            </div>
                        </div>

                        <button className='btn btn-primary md:w-[376px] sm:w-[298px]' onClick={signIn} disabled={auth.authenticating}>
                            {
                                auth.authenticating ?
                                <div id='loader' className='w-full mx-auto'></div>
                                : "Log In"
                            }
                        </button>
                        
                        <div className='flex flex-row justify-between items-center text-[10px] md:w-[376px] w-[298px]'>
                            <div><Link to={'/forgot-password'}>Forgot Password?</Link></div>
                            <div className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Don't have an account? <Link to={'/signup'}>Sign Up</Link></div>
                        </div>

                        <p className={`text-[12.5px] md:text-[16px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>-------------------- or -------------------</p>

                        <div >
                            <GoogleLogin
                            onSuccess={credentialResponse}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            style={{width: '376px'}} className={'w-[298px] md:w-[376px]'}
                            />
                        </div>
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

export default Signin