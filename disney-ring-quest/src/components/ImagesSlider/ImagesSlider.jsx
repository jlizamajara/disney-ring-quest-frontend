import React, { useState, useEffect } from 'react';
import './ImagesSlider.css'

const ImagesSlider = ({ interval, images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      for (let i = 0; i < images.length; i++) {
        if (i === currentImage) {
          setCurrentImage((prevImage) => (prevImage + 1) % images.length);
          break;
        }
      }
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [interval, images, currentImage]);

  return (
    <div className='images-slider'>
      <img src={images[currentImage]} alt="Slideshow" />
    </div>
  );
};

export default ImagesSlider;
