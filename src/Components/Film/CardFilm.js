import React from 'react'
import { history } from '../../App';
import './CardFilm.css'
export default function CardFilm(props) {
    const {phim} = props
    return (
        <div className='relative p-3'>
            <div className='card__film w-3/4 rounded-2xl'>
                <img className='transition duration-500  z-50 relative w-full rounded-2xl' src={phim.hinhAnh} style={{height:'400px'}} alt='123'
                    onError={e=>{
                        e.target.onerror = null;
                        e.target.src = 'https://picsum.photos/400'
                    }}
                ></img>
                <div className='overlay rounded-2xl'></div>
                <div className='text-left p-4 card__content absolute z-20 bottom-0 w-4/6'>
                    <h4 className='font-bold text-4xl text-white'>{phim.tenPhim}</h4>
                    <p className='mt-1 mb-2 font-bold text-white text-sm break-all'>{phim.moTa.length > 100 ? <span>{phim.moTa.slice(0,30)}...</span> : <span>{phim.moTa}</span>}</p>
                    <button onClick={()=>{
                        history.push(`/detail/${phim.maPhim}`)
                    }} className='transition-all duration-500 hover:border-purple-500 hover:bg-white hover:text-black py-2 px-5 rounded-md  bg-black text-white text-xl text-bold border-2 border-transparent'>Đặt Vé</button>
                </div>
            </div>
        </div>
    )
}
