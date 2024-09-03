import React from 'react'
import './about.css'
import Me from '../../assets/myphoto.jpg'
import { Link } from 'react-router-dom'
import Layout from '../Layout/Layout'
import { useSelector } from 'react-redux'
import { BsLinkedin } from 'react-icons/bs' // importing icons from the react-icons library
import { FaGithub } from 'react-icons/fa'
import { BsInstagram } from 'react-icons/bs'

function About() {
  const mode = useSelector((state) => state.mode)
  const auth = useSelector((state) => state.auth)
  return (
    <Layout>
      <section id='about'>
        <h5 className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>Get To Know</h5>
        <h2>About Me</h2>

        <div className="container about-container">
          <div>
            <div>
              <img className='rounded-full animate-pulse border border-black mb-16 mt-4' src={Me} alt="Me" />
            </div>
          </div>

          <div className="about-content">
            <div className="about-cards">
              <article className={`about-card-content ${mode.mode === 'dark' ? 'bg-[#2c2c6c]' : ''}`}>
                <a href="https://linkedin.com/in/ajmat-kathat-0a5b45252" target='_blank'>
                  <BsLinkedin className="about-icon" />
                  <h5>LinkedIn</h5>
                  <small>Let's Connect!</small>
                </a>
              </article>
              <article className="about-card-content">
                <a href="https://github.com/moyemoyedfsdf" target='_blank'>
                  <FaGithub className="about-icon" />
                  <h5>Github</h5>
                  <small>Let's Develop!</small>
                </a>
              </article>
              <article className="about-card-content">
                <a href="https://instagram.com/_ajmat6" target='_blank'>
                  <BsInstagram className="about-icon" />
                  <h5>Instagram</h5>
                  <small>Let's Sneak-Peek!</small>
                </a>
              </article>
            </div>

            <p className={`${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>"👋Hii, I'm Ajmat Kathat, a final year IT Student at Arya College of Engineering and IT, skilled in Data structures and algorithms and a full-stack web developer.As said that alone, we can do so little; together, we can do so much, let's collaborate and make our online presence truly shine!"</p>
            <div className='flex justify-center items-center'>
              <Link to={auth.authenticate ? "/contact" : '/signin'} className='btn btn-primary'>Contact Me</Link>
              {/* <Link to="/adminLogin" className='btn btn-primary ml-3'>Login as Ajmat!</Link> */}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default About
