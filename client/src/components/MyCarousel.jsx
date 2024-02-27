import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import star from "../assets/star.png"

const MyCarousel = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  const renderCards = () => {
    const cards = [];
    for (let i = 1; i <= 8; i++) {
      cards.push(
        <div key={i} className="p-4">
          <div className="border border-gray-200 rounded-md p-4">
            <div className="relative mb-4">
              <img src={`image-url-${i}.jpg`} alt={`Product ${i}`} className="w-full h-48 object-cover rounded-md mb-2" />
            </div>
            <div className='flex'>
            <div className=''>
              <h2 className="text-lg font-semibold mb-1">Product {i}</h2>
              <p className="text-gray-600 mb-1">Marrakesh</p>
              <p className="text-gray-600 mb-1">01-03-2024</p>
              <p className="text-gray-600 mb-1">$25</p>
            </div>
            <div className='ml-6 mt-6'>
              <div className="flex items-center mb-1 ml-14">
                <img className='h-4' src={star} alt="" />
                <p>4.95</p>
              </div>
              <button className="mt-6 bg-custom-brown hover:bg-custom-brown text-white px-4 py-2 rounded-md">
                Add to Cart
              </button>
            </div>
            </div>
          </div>
        </div>
      );
    }
    return cards;
  };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      removeArrowOnDeviceType={['tablet', 'mobile']}
    >
      {renderCards()}
    </Carousel>
  );
};

export default MyCarousel;
