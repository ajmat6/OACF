// import React from 'react'
// import './links.css'
// import leetcode from '../../assets/LeetCode.png'
// import gfg from '../../assets/gfg.jfif'
// import github from '../../assets/github.png'
// import Linkedin from '../../assets/linkedin.png'

// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from "swiper/react";

// // Import Swiper styles
// import 'swiper/css';
// import "swiper/css/pagination";

// const data = [
//     {
//         photo: Linkedin,
//         name: 'LinkedIn',
//         link: 'https://linkedin.com/in/ajmat-kathat-0a5b45252'
//     },
//     {
//         photo: leetcode,
//         name: 'Leetcode',
//         link: 'https://leetcode.com/ajmat6'
//     },
//     {
//         photo: github,
//         name: 'Github',
//         link: 'https://github.com/ajmat6'
//     },
//     {
//         photo: gfg,
//         name: 'GeeksforGeeks',
//         link: 'https://auth.geeksforgeeks.org/user/ajmat1130666'
//     }
// ]

// function Links() {
//   return (
//     <section id="links">
//         <h5>Look At My Profiles</h5>
//         <h2>Links</h2>

//         {/* Swiper js -> First install it by npm i swiper and then look for the documentation */}
//         <Swiper className="container links-container"
//         modules={[Pagination]}
//         spaceBetween={40}
//         slidesPerView={1}
//         pagination={{ clickable: true }}    >
//             {
//                 data.map(({photo, name, link}, index) => {
//                     return (
//                         <SwiperSlide key={index} className="links">
//                             <div className="link-photo">
//                                 <a href={link} target="_blank"><img src={photo} alt={name} /></a>
//                             </div>
//                             <h5 className='link-name'>{name}</h5>
//                         </SwiperSlide>
//                     )
//                 })
//             }
//         </Swiper>
//     </section>
//   )
// }

// export default Links
