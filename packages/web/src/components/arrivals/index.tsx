import React from "react";
import Slider from "react-slick";
import Heading from "../product/Heading";
import Product from "../product/Product";
import { NewArrivalsProps } from "../product/dto/product.dto";

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="w-full py-16">
      <Heading heading="New Arrivals" />
      <Slider {...settings}>
        {products.map(product => (
          <div className="px-2" key={product.id}>
            <Product {...product}/>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default NewArrivals;
