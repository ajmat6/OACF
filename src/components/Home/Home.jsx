import React from 'react'
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import arya1 from '../../assets/arya5.jpg'
import arya2 from '../../assets/arya1.jpg'
import arya3 from '../../assets/arya2.jpg'
import arya4 from '../../assets/arya3.jpg'
import arya5 from '../../assets/arya4.jpg'
import Layout from '../Layout/Layout';
import { useSelector } from 'react-redux'
import './home.css'

const Home = () => {
  const mode = useSelector((state) => state.mode)

  const swiper = new Swiper('.swiper', {
    speed: 400,
    autoplay: {
      delay: 4000,
    }
  });

  return (
    <Layout>
      <section id="home" className='mt-20px'>
        <div className={`flex flex-col md:flex-row mx-10 ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>
          <div className='md:mt-20 md:mr-10 md:ml-14'>
            <h1 className={`animate-bounce ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>
              <span className='text-[#4db5ff]'>Old</span> Arya Connect!
            </h1>
            <h2 className={`max-w-[200px] ${mode.mode === 'dark' ? 'text-white' : 'text-black'}  font-italic mb-6 mt-2`}>“I wish there was a way to know you were in the good old days before you actually left them.”</h2>

            ---------------------------
            <h2 className={`max-w-[200px]  mt-6  ${mode.mode === 'dark' ? 'text-white' : 'text-black'}`}>"Get ready to ace uni life with amazing notes, tips, share epic memories, and gear up for placements! Your go-to Old Arya Connect!."</h2>
          </div>
          <div class="swiper max-w-[310px] mt-16 md:my-0 md:max-w-[800px]">
            <div class="swiper-wrapper autoplay-play">
              <img class="swiper-slide rounded-lg aspect-auto" src={arya4} alt='' />
              <img class="swiper-slide rounded-lg aspect-auto" src={arya2} alt='arya' />
              <img class="swiper-slide rounded-lg aspect-auto" src={arya1} alt='arya' />
              <img class="swiper-slide rounded-lg aspect-auto" src={arya5} alt='arya' />
              <img class="swiper-slide rounded-lg aspect-auto" src={arya3} alt='arya' />
            </div>
            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            <div class="swiper-scrollbar"></div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Home