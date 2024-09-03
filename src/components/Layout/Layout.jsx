import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Layout = (props) => {
  return (
    <>
        <Navbar />
        {props.children}
        {props.footer ? null : <Footer />}
    </>
  )
}

export default Layout