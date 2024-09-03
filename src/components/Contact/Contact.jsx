import React, { useState,  useRef, useEffect } from 'react';
import './contact.css'
import {HiOutlineMail} from 'react-icons/hi'
import {BsLinkedin} from 'react-icons/bs'
import {BsWhatsapp} from 'react-icons/bs'
import emailjs from 'emailjs-com' // Importing emailjs
import Layout from '../Layout/Layout';
import {useSelector} from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Contact() {
  const mode = useSelector((state) => state.mode)
  const auth = useSelector((state) => state.auth)
  const navigate = useNavigate();

  const [name, setname] = useState(auth.userInfo.name);
  const [email, setemail] = useState(auth.userInfo.email);
  const [description, setdescription] = useState();

  useEffect(() => {
    if(!auth.authenticate) navigate('/signin')
  }, [])

  // Taken from emailjs docs
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if(description === "") return toast("Message should be atleast 10 characters long!")

    emailjs.sendForm('service_2mp7tzs', 'template_8t9vhsi', form.current, '7Tr7DoGXcC_4hpdqM')
    toast("Message sent successfully!")

    setdescription('');
  };

  return (
    <Layout>
      <section id='contact'>
        <h5  className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>If you have any kind of Notes - Related to RTU, DSA, Any type of Tech Skills, Do Email or WhatsApp me</h5>
        <h2>Contact Me</h2>

        <div className="container contact-container">
          <div className="contact-options">
            <article  className={`contact-option ${mode.mode === 'light' ? 'hover:text-black' : ''}`}>
              <HiOutlineMail className='option-icon'/>
              <h4>Email</h4>
              <h6>oldaryaconnect@gmail.com</h6>
              <a href="mailto:oldaryaconnect@gmail.com" target="_blank">Send a message</a>
            </article>
            <article  className={`contact-option ${mode.mode === 'light' ? 'hover:text-black' : ''}`}>
              <BsLinkedin className='option-icon'/>
              <h4>LinkedIn</h4>
              <h6>Ajmat Kathat</h6>
              <a href="https://linkedin.com/in/ajmat-kathat-0a5b45252" target="_blank">Send a message</a>
            </article>
            {/* <article className={`contact-option ${mode.mode === 'light' ? 'hover:text-black' : ''}`}>
              <BsWhatsapp className='option-icon'/>
              <h4>WhatsApp</h4>
              <h6>+91-9521xxxxxx</h6>
              <a href="https://api.whatsapp.com/send?phone=9521200877" target="_blank">Send a message</a>
            </article> */}
          </div>

          {/* Using useRef hook for the action of the form */}
          <form ref={form} onSubmit={sendEmail}>
            <input type="text" name='name' className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} value={name} required/>
            <input type="email" name='email' className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} value={email} required/>
            <textarea className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`} onChange={(e) => setdescription(e.target.value)} value={description} name="message" rows="7" placeholder='Enter Your Message'></textarea>
            <button type='submit' className='btn btn-primary submitButton'>Send Message</button>
          </form>
        </div>
      </section>
      <ToastContainer
        theme='dark'
      />
    </Layout>
  )
}

export default Contact
