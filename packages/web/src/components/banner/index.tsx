import React, { useState } from "react";
import Slider from "react-slick";
import Image from "../../layouts/layout/Image";
import bannerImgOne from "../../assets/images/banner/bannerImgOne.jpg";
import bannerImgTwo from "../../assets/images/banner/bannerImgOne.jpg";

const Banner: React.FC = () => {
  const [dotActive, setDotActive] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (prev: number, next: number) => {
      console.log(prev);
      setDotActive(next);
    },
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "2%",
          transform: "translateY(-15%)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {dots}
      </div>
    ),

    responsive: [
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots: React.ReactNode) => (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "0",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ul>{dots}</ul>
            </div>
          ),
          customPaging: (i: number) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      borderRight: "3px #262626 solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      borderRight: "3px white solid",
                      cursor: "pointer",
                      fontSize: "12px",
                    }
              }
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  return (
    <div className="w-full relative bg-white">
      <Slider {...settings}>
        <div className="w-full">
          <Image className="w-full" imgSrc={bannerImgOne} />
        </div>
        <div>
          <Image imgSrc={bannerImgTwo} />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
