import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Film from '../Components/Film/Film';
import HomeMenu from './HomeMenu/HomeMenu'
import MultipleRow from '../Components/ReactSlick/MultipleRow'
import { layDanhSachPhimAction } from '../redux/actions/QuanLyPhimAction';
import { layDanhSachCumRap } from '../redux/actions/QuanLyRapAction';
import CarouselComponent from '../Components/Layout/CarouselComponent/CarouselComponent';

export default function Home() {
    const dispatch = useDispatch();
    const {listFilm} = useSelector(state => state.QuanLyPhimReducer);
    const {heThongRap} = useSelector(state => state.QuanLyRapReducer);
    console.log(listFilm)
    useEffect(()=>{
        dispatch(layDanhSachPhimAction)
        dispatch(layDanhSachCumRap)
    },[])
    return (
        <>
        <CarouselComponent></CarouselComponent>
        <div className='container mx-auto'>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                            <MultipleRow listFilm={listFilm}></MultipleRow>
                </div>
            </section>
            
            <HomeMenu heThongRap={heThongRap}></HomeMenu>
        </div>
        </>
    )
}
