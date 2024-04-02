import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import star from "../../assets/star.png";
import axios from "axios";
import FanousButton from "../Button/Button";
const MyCarousel = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/event/all");
        if (response.status === 200) {
          setProductData(response.data);
        } else {
          console.error("Failed to fetch product data");
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, []);

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

  const product = productData.map((item) => (
    <div className="cardd" key={item._id}>
      {/* <div className="likes-iconn" onClick={() => handleFavorite(item)}>
        {likedProducts(item._id) ? (
          <FavoriteRoundedIcon />
        ) : (
          <FavoriteBorderRoundedIcon />
        )}
      </div> */}
      {/* <div className="likes-icon" onClick={() => handleFavorite(item)}>
        <FavoriteIcon
          style={{
            fontSize: "1.7rem",
            color: likedProductIds.includes(item._id) ? "red" : "white",
          }}
        />
      </div> */}
      {/* <div className="likes-iconn" onClick={() => handleFavorite(item)}>
        {likedProductIds.includes(item._id) ? (
          <FavoriteRoundedIcon />
        ) : (
          <FavoriteBorderRoundedIcon />
        )}
      </div> */}
      <div className="imageprdctss">
        <img
          className="product--imagee"
          // src={item.product_image}
          alt="product image"
        />
      </div>
      <div className="cart-textt">
        <span
          className="prdctnamee"
          onClick={() => navigateToProductDetail(item._id)}
        >
          {item.name}
        </span>
        <p
          className="desc_ellipsis"
          onClick={() => navigateToProductDetail(item._id)}
        >
          {item.location}
        </p>
        <div className="pricee">
          <div
            className="realprice"
            onClick={() => navigateToProductDetail(item._id)}
          >
            ${item.price}
          </div>
          <div className="addbuttonn">
            <FanousButton onClick={() => addToCart(item)}>
              Add To Cart
            </FanousButton>
          </div>
        </div>
      </div>
      {/* <div className="cardprdct"> */}
    </div>
    // </div>
  ));

  // const renderCards = () => {
  //   const cards = [];
  //   for (let i = 1; i <= 8; i++) {
  //     cards.push(
  //       <div key={i} className="p-4">
  //         <div className="border border-gray-200 rounded-md p-4">
  //           <div className="relative mb-4">
  //             <img src={`image-url-${i}.jpg`} alt={`Product ${i}`} className="w-full h-48 object-cover rounded-md mb-2" />
  //           </div>
  //           <div className='flex'>
  //           <div className=''>
  //             <h2 className="text-lg font-semibold mb-1">Product {i}</h2>
  //             <p className="text-gray-600 mb-1">Marrakesh</p>
  //             <p className="text-gray-600 mb-1">01-03-2024</p>
  //             <p className="text-gray-600 mb-1">$25</p>
  //           </div>
  //           <div className='ml-6 mt-6'>
  //             <div className="flex items-center mb-1 ml-14">
  //               <img className='h-4' src={star} alt="" />
  //               <p>4.95</p>
  //             </div>
  //             <button className="mt-6 bg-custom-brown hover:bg-custom-brown text-white px-4 py-2 rounded-md">
  //               Add to Cart
  //             </button>
  //           </div>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }
  //   return cards;
  // };

  return (
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      //mine
      additionalTransfrom={0}
      arrows
      dotListClass=""
      renderDotsOutside={true}
      // centerMode={false}
      className=""
      containerClass="container-with-dots"
      draggable
      focusOnSelect={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      {product}
    </Carousel>
  );
};

export default MyCarousel;
