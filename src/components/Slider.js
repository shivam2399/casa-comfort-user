import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import './Slider.css';

import image1 from '../assets/PS5.jpeg'
import image2 from '../assets/Macbook.jpeg';
import image3 from '../assets/Lays.jpg';
import image4 from '../assets/Vicks.jpeg';
import image5 from '../assets/Giani.png';

const Slider = () => {
  useEffect(() => {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {
        delay: 3000, // 3000ms = 3 seconds
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }, []);

  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <div className="swiper-slide"><img src={image1} alt="Slide 1" /></div>
        <div className="swiper-slide"><img src={image2} alt="Slide 2" /></div>
        <div className="swiper-slide"><img src={image3} alt="Slide 3" /></div>
        <div className="swiper-slide"><img src={image4} alt="Slide 4" /></div>
        <div className="swiper-slide"><img src={image5} alt="Slide 5" /></div>
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};

export default Slider;
