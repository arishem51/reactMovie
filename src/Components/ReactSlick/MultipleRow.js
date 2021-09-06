import React, { Component, useState } from "react";
import Slider from "react-slick";
import CardFilm from "../Film/CardFilm";
import Film from "../Film/Film";
import styleSlick from './MultipleRow.module.css'


function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
    </div>

  );
}



function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick['slick-prev']}`}

      style={{ ...style, display: "block", left: '-50px' }}
      onClick={onClick}
    >
    </div>
  );
}

 const MultipleRows = (props) => {
  const [state,setState] = useState(true)
  const activeClass = styleSlick['active_Film'];
  const renderFilm = ()=>{
    // return props.listFilm.map((item,index)=>{
    //   return <div className={`${styleSlick['width-item']}`} key={index}>
    //           <CardFilm phim={item}></CardFilm>
    //   </div>
    // })

    return props.listFilm.filter(item=>item.dangChieu === state).map((item,index)=>{
      return <div className={`${styleSlick['width-item']}`} key={index}>
                <CardFilm phim={item}></CardFilm>
        </div>
    })
  }

      const settings = {
        className: "center variable-width",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 4,
      speed: 500,
      rows: 1,
      slidesPerRow: 2,
      variableWidth: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };


    return (
      <div>
        <div className='flex my-3'>
          <button type="button" className={`mr-6 px-8 py-3 font-semibold rounded-full bg-black text-white border-2 border-transparent hover:bg-white hover:text-black hover:border-purple-600 transition-all duration-500 ${  state ? activeClass : '' }`}  onClick={()=>{
            setState(true);
          }}>Phim Đang Chiếu </button>
          <button type="button" className={`px-8 py-3 font-semibold rounded-full bg-black text-white border-2 border-transparent hover:bg-white hover:text-black hover:border-purple-600 transition-all duration-500 ${state ? '' : activeClass}`} onClick={()=>{
            setState(false)
          }}>Phim Sắp Chiếu </button>
        </div>
        <Slider {...settings}>
          {renderFilm()}
        </Slider>
      </div>
    );
}


export default MultipleRows