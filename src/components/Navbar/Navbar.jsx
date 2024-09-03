import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../../reducers/userAuthReducer';
import { useNavigate } from 'react-router-dom'
// import {RxCross2} from 'react-icons/rx'
import { BsFillMoonStarsFill } from 'react-icons/bs'
import { BsFillSunFill } from 'react-icons/bs'
import { generatePublicURL } from '../../urlConfig';
import profilePicSample from '../../assets/profilePicSample.jpeg'
import { changeModee } from '../../reducers/modeReducer';
import './navbar.css'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { AiOutlineAreaChart } from 'react-icons/ai'
import { BiMessageSquareDetail } from 'react-icons/bi'
import { AiFillBook } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Navbar(props) {
  const auth = useSelector((state) => state.auth)
  const mode = useSelector((state) => state.mode)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showCross, setShowCross] = useState(false);

  const [currentMode, setCurrentMode] = useState('dark');
  const [lg, setLg] = useState('linear-gradient(black, #1f1f38, black)')

  const Logout = () => {
    dispatch(logout())
    toast("Logging Out..")
    setTimeout(() => {
      console.log(auth.authenticate)
      navigate('/signin')
    }, 2000);
  }

  const hamburgerOpen = () => {
    setShowCross(true)
    const navlinks = document.querySelector('.nav-links')
    navlinks.classList.add('top-[75px]')
    navlinks.classList.remove('top-[-100%]')
  }

  const hamburgerClose = () => {
    setShowCross(false)
    const navlinks = document.querySelector('.nav-links')
    navlinks.classList.add('top-[-100%]')
    navlinks.classList.remove('top-[75px]')
  }

  const changeMode = () => {
    const body = document.body;
    if (mode.mode === 'dark') {
      // setCurrentMode('light');
      body.style.background = 'white'
    }
    else {
      setCurrentMode('dark')
      body.style.background = lg
    }

    dispatch(changeModee());
  }

  const showLoginMessage = () => {
    if(!auth.authenticate) toast("Sign in to see notes, lost & found items and to contact ajmat!")
  }

  return (
    <>
      <nav className={`p-3 flex items-center justify-between z-10`}>
        <div className="text-xl font-semibold">
          <span className="inline-block animate-bounce text-[#4db5ff] mr-2">Old</span>
          <span className={`inline-block animate-pulse ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Arya</span>
        </div>
        <div className={`bg-black ${mode.mode === 'dark' ? 'bg-black' : 'bg-white'} nav-links md:static absolute md:min-h-fit min-h-[26vh] left-0 top-[-100%] md:w-auto w-full flex items-center`}>
          <div className={`lis font-semibold flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 ml-3`}>
            <Link to="/" className={`heads ${mode.mode === 'dark' ? 'text-white' : 'text-black'} px-4 hover:text-white-gray-300 transtion-color duration-300 flex`}><span><AiOutlineHome className='mt-1 mr-1' /></span>Home</Link>
            <Link to="/about" className={`heads ${mode.mode === 'dark' ? 'text-white' : 'text-black'} px-4 hover:text-white-gray-300 transtion-color duration-300 flex`}><span><AiOutlineUser className='mt-1 mr-1' /></span>About</Link>
            <Link to={auth.authenticate ? "/notes" : "/signin"} onClick={showLoginMessage} className={`heads ${mode.mode === 'dark' ? 'text-white' : 'text-black'} hover:text-gray-300 px-4 flex`}><span><AiFillBook className='mt-1 mr-1' /></span>Notes</Link>
            <Link to={auth.authenticate ? "/lost-and-found/allItems" : "/signin"} onClick={showLoginMessage} className={`heads ${mode.mode === 'dark' ? 'text-white' : 'text-black'} hover:text-gray-300 px-4 flex`}><span><AiOutlineAreaChart className='mt-1 mr-1' /></span>Lost|Found</Link>
            <Link to={auth.authenticate ? "/contact" : "/signin"} onClick={showLoginMessage} className={`heads ${mode.mode === 'dark' ? 'text-white' : 'text-black'} hover:text-gray-300 px-4 flex`}><span><BiMessageSquareDetail className='mt-1 mr-1' /></span>Contact</Link>
          </div>
        </div>

        {
          !auth.authenticate ?
            <div className='flex flex-row gap-4'>
              {
                mode.mode === 'dark' ?
                  <button className={`text-2xl`} onClick={changeMode}><BsFillMoonStarsFill className='text-white' /></button>
                  :
                  <button className={`text-2xl`} onClick={changeMode}><BsFillSunFill className='text-black' /></button>
              }
              <Link to={'/signin'}><button className='btn btn-primary p-2'>Login</button></Link>
            </div>
            :
            <div className='three flex flex-row gap-2 md:gap-3'>
              {
                mode.mode === 'dark' ?
                  <button className={`text-2xl`} onClick={changeMode}><BsFillSunFill className='text-white' /></button>
                  :
                  <button className={`text-2xl`} onClick={changeMode}><BsFillMoonStarsFill className='text-black' /></button>
              }
              <Link className='mx-3'><button onClick={Logout} className='logout btn btn-primary p-2'>Logout</button></Link>
              <Link to={'/myProfile'}>
                <img src={auth.userInfo.profilePic !== '' ? generatePublicURL(auth.userInfo.profilePic) : profilePicSample} className={`rounded-full h-[43px] w-[45px] ${mode.mode === 'light' ? 'border border-black' : 'border border-white'}`} />
              </Link>
            </div>
        }

        <div className='md:hidden'>
          {
            showCross === false ?
              <button className={`text-2xl cursor-pointer ${mode.mode === 'light' ? 'text-black' : ''}`} onClick={hamburgerOpen}>&#8801;</button>
              :
              <button className={`text-2xl cursor-pointer ${mode.mode === 'light' ? 'text-black' : ''}`} onClick={hamburgerClose}>X</button>
          }
        </div>
      </nav>
      <ToastContainer
        theme='dark'
      />
    </>
  )
}