import React, { useState } from 'react'
import './profile.css'
import profilePicSample from '../../assets/profilePicSample.jpeg'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserInfo } from '../../reducers/userAuthReducer'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePublicURL } from '../../urlConfig'
import { checkUsername } from '../../reducers/userAuthReducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserProfile() {
    const auth = useSelector((state) => state.auth);
    const mode = useSelector((state) => state.mode)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState(auth.userInfo.username);
    const [name, setName] = useState(auth.userInfo.name);
    const [gender, setGender] = useState(auth.userInfo.gender);
    const [email, setEmail] = useState(auth.userInfo.email);
    const [contact, setContact] = useState(auth.userInfo.contact);

    const [editPValue, setEditPValue] = useState('Edit')
    const [editP, setEditP] = useState(false)

    const [editEmailValue, setEditEmailValue] = useState('Edit')
    const [editEmail, setEditEmail] = useState(false)

    const [editMobileValue, setEditMobileValue] = useState('Edit')
    const [editMobile, setEditMobile] = useState(false)

    const [profilePic, setProfilePic] = useState(profilePicSample);
    const [picEdit, setPicEdit] = useState(false);

    console.log(profilePic, "pic")

    const [showPersonal, setShowPersonal] = useState(true);
    const [showAddress, setShowAddress] = useState(false);


    const editPersonal = () => {
        if (editPValue === 'Edit') {
            setEditPValue('Cancel');
            setEditP(true)
        }
        else {
            setEditPValue('Edit');
            setEditP(false)
        }
    }

    const editEmailAction = () => {
        if (editEmailValue === 'Edit') {
            setEditEmailValue('Cancel');
            setEditEmail(true)
        }
        else {
            setEditEmailValue('Edit');
            setEditEmail(false)
        }
    }

    const editMobileAction = () => {
        if (editMobileValue === 'Edit') {
            setEditMobileValue('Cancel');
            setEditMobile(true)
        }
        else {
            setEditMobileValue('Edit');
            setEditMobile(false)
        }
    }

    // function to handle personal info edit:
    const personalInfoEdit = () => {
        editPersonal()
        if(name === "") return toast("Name cannot be blank!")
        if(username === "") return toast("Username cannot be empty!")
        if(name === auth.userInfo.name && username === auth.userInfo.username && gender === auth.userInfo.gender) return toast("No updation done!")
        const form = {
            name, username, gender
        }

        if(username !== auth.userInfo.username)
        {
            dispatch(checkUsername({username}))
            .then((result) => {
                if(result.payload.message === "Success!")
                {
                    dispatch(updateUserInfo(form))
                    .then((result) => {
                        if(result.payload === undefined) toast("Some error occured! Refresh page and try again.")
                        else toast("Personal Information Updated!");
                    })
                }
                else toast("Entered Username is not available!")
            })
        }

        else
        {
            dispatch(updateUserInfo(form))
            .then((result) => {
                if(result.payload === undefined) toast("Some error occured! Refresh page and try again.")
                else toast("Personal Information Updated!");
            })
        }
    }

    // function to handle email edit:
    const emailEdit = () => {
        editEmailAction()
        const form = {
            email
        }

        dispatch(updateUserInfo(form))
    }

    // function to handle mobile number edit:
    const contactEdit = () => {
        editMobileAction()
        if(contact.length !== 10) return toast("Please enter valid phone number!")
        const form = {
            contact
        }

        dispatch(updateUserInfo(form))
        .then((result) => {
            if(result.payload !== undefined) toast("Mobile number updated!")
            else toast("Some error occured! Refresh page and try again.")
        })
    }

    const profilePicEdit = () => {
        setPicEdit(false);
        const form = new FormData();
        form.append('profilePicture', profilePic)

        dispatch(updateUserInfo(form))
    }

    useEffect(() => {
        if (!auth.authenticate) {
            navigate('/')
        }
    }, [])

    return (
        <Layout>
            <section id='about'>
                <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Your Profile</h5>
                <h2>Have Notes? <Link to={'/contact'}>Share</Link></h2>

                <div className={`container about-container ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>
                    <div className="">
                        <div className="">
                            <div className='w-[300px] md:w-full'>
                                <img className='rounded-full border border-[#4db5ff] mb-10 mt-4 h-[320px] md:h-[380px] object-contain' src={auth.userInfo.profilePic !== '' ? generatePublicURL(auth.userInfo.profilePic) : profilePic} alt="Me" />
                            </div>
                            <div className='flex flex-row gap-3 w-[300px] md:w-full'>
                                <input
                                    className={`h-17 w-60 ml-18 md:ml-[40px] text-sm text-center cursor-pointer p-2 ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}
                                    type='file'
                                    onChange={(e) => {
                                        setProfilePic(e.target.files[0]);
                                        setPicEdit(true)
                                        console.log(profilePic, "pic")
                                    }}
                                />
                                {
                                    picEdit ?
                                        <button
                                            onClick={profilePicEdit}
                                            className='btn btn-primary h-12'
                                        >
                                            SAVE
                                        </button> : <div className='w-20'></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="about-content mt-8">
                        <div className='rightContainer'>
                            <div style={{ paddingBottom: '24px' }} className='w-[300px] md:w-full '>
                                <div className='flex flex-row justify-between'>
                                    <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Personal Information</strong></span>
                                    <span onClick={editPersonal}><Link to={'#'} className={`hover:${mode.mode === 'light' ? 'text-black' : ''}`} >{editPValue}</Link></span>
                                </div>
                            </div>

                            <form className='md:w-full w-[300px]'>
                                <div className='flex flex-start w-[300px] md:w-full'>
                                    <div style={{ paddingRight: '12px' }}>
                                        <div style={{ marginBottom: '10px', position: 'relative' }}>
                                            <label htmlFor="firstname" className='labell'>Username</label>
                                            <input
                                                type="text"
                                                className={`h-10 ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}
                                                placeholder={auth.userInfo.username}
                                                value={username}
                                                disabled={!editP ? true : false}
                                                onChange={(e) => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div style={{ width: '270px', paddingRight: '12px' }}>
                                        <div style={{ marginBottom: '10px', position: 'relative' }}>
                                            <label htmlFor="lastname" className='labell'>Name</label>
                                            <input
                                                type="text"
                                                className={`h-10 ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}
                                                placeholder={auth.userInfo.name}
                                                value={name}
                                                disabled={!editP ? true : false}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex w-full justify-between'>
                                    <div style={{ padding: '12px 0', fontSize: '14px' }}>
                                        Your Gender
                                    </div>
                                    <div className='flex'>
                                        <div className='flexRow'>
                                            <input type="radio" name='gender' disabled={!editP ? true : false} value="male" onChange={(e) => setGender(e.target.value)} checked={gender === 'male'} />
                                            <div style={{ marginLeft: '10px' }}>Male</div>
                                        </div>
                                        <div className='flexRow' style={{ marginLeft: '30px' }}>
                                            <input type="radio" name='gender' disabled={!editP ? true : false} value="female" onChange={(e) => setGender(e.target.value)} checked={gender === 'female'} />
                                            <div style={{ marginLeft: '10px' }}>Female</div>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            editP ?
                                            <button
                                            onClick={personalInfoEdit}
                                            className='btn btn-primary p-2'
                                            >
                                                    SAVE
                                                </button> : <div className='w-20'></div>
                                        }
                                    </div>
                                </div>

                                <div style={{ marginTop: '50px' }} className='w-[300px] md:w-full'>
                                    <div style={{ paddingBottom: '24px' }}>
                                        <div className='flex flex-row justify-between '>
                                            <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Email Address</strong></span>
                                            {/* <span className='edit' onClick={editEmailAction}><Link to={'#'} className={`hover:${mode.mode === 'light' ? 'text-black' : ''}`}>{editEmailValue}</Link></span> */}
                                        </div>
                                    </div>

                                    <div className='flex flex-row justify-between'>
                                        {/* <label htmlFor="lastname" className='labell'>Email</label> */}
                                        <input
                                            className={`h-10 w-[220px] md:w-[250px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}
                                            type="email" placeholder={auth.userInfo.email}
                                            value={email}
                                            disabled={!editEmail ? true : false}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div>
                                            {
                                                editEmail &&
                                                <button
                                                
                                                onClick={emailEdit}
                                                className='btn btn-primary p-2 mt-1'
                                                >
                                                    SAVE
                                                </button>
                                            }
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '50px' }} className='w-[300px] md:w-full'>
                                        <div style={{ paddingBottom: '24px' }}>
                                            <div className='flex flex-row justify-between'>
                                                <span style={{ paddingRight: '24px', fontSize: '18px' }}><strong>Mobile Number</strong></span>
                                                <span className='edit' onClick={editMobileAction}><Link className={`hover:${mode.mode === 'light' ? 'text-black' : ''}`}>{editMobileValue}</Link></span>
                                            </div>
                                        </div>
                                        <div className='flex flex-row justify-between'>
                                            <input
                                                className={`h-10 w-[220px] md:w-[250px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}
                                                type="number"
                                                placeholder={auth.userInfo.contact ? auth.userInfo.contact : "ADD MOBILE NUMBER"}
                                                disabled={!editMobile ? true : false}
                                                value={contact}
                                                onChange={(e) => setContact(e.target.value)}
                                            />
                                            <div>
                                                {
                                                    editMobile &&
                                                    <button
                                                    onClick={contactEdit}
                                                    className='btn btn-primary p-2 mt-1'
                                                    >
                                                        SAVE
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer 
                    theme='dark'
                />
            </section>
        </Layout>
    )
}

export default UserProfile
