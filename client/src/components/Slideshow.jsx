import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slideshow = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Slider {...settings}>
      {items.map(item => (
        <div key={item.id} className="p-2">
          <div className="bg-white shadow-md rounded-md">
            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-t-md" />
            <h2 className="text-lg font-bold p-2">{item.name}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;