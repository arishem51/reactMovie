/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Carousel } from 'antd';
import {useDispatch, useSelector} from 'react-redux'
import axios  from 'axios'
import { getCarouse } from '../../../redux/actions/CarouselActions';
import './Carousel.css'

const contentStyle = {
    height: '1000px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition:'center',
    backgroundSize:'cover',
    backgroundRepeat:'no-repeat'
};



export default function CarouselComponent(props) {
    const dispacth = useDispatch();
    useEffect(  ()=>{
        dispacth(getCarouse)
    },[])

    const {listBanner} = useSelector(state => state.CarouselBannerReducer)
    const renderBanner = ()=>{
        return listBanner.map((banner,index)=>{
            return <div key={index} >
                <div style={{...contentStyle,backgroundImage:`url(${banner.hinhAnh})`}}>
                         <img src={banner.hinhAnh} className='opacity-0 w-full' alt={banner.hinhAnh}></img>
                </div>
            </div>
        })
    }
    return (
            <Carousel effect="fade" autoplay='true'>
                    {renderBanner()}
            </Carousel>
    )
}
