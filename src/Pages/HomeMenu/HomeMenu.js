import React, { useEffect, useState } from 'react'
import { Tabs, Radio, Space } from 'antd';
import {NavLink} from 'react-router-dom'
import moment from 'moment'
const { TabPane } = Tabs;
export default function HomeMenu(props) {
    const {heThongRap} = props
    const renderHeThongRap = ()=>{
        return heThongRap?.map((item,index)=>{
          return  <TabPane tab={ <img src={item.logo} className='rounded-full w-14' alt='hihi'></img>} key={index}>
                       <Tabs tabPosition={'left'}>
                                {item.lstCumRap?.slice(0,6).map((rap,index)=>{
                                  return <TabPane key={index} tab={
                                    <div className='flex'>
                                        <div>
                                            <img src={rap.hinhAnh} alt={rap.hinhAnh} style={{width:'56px'}}></img>
                                        </div>
                                        <div className='ml-3'>
                                          <p className='text-left'>{rap.tenCumRap}</p>
                                          <p className='text-red-600 text-left mt-2'>{rap.diaChi.length > 50 ? `${rap.diaChi.slice(0,50)}...` : `${rap.diaChi}`}</p>
                                        </div>
                                    </div>
                                  }>
                                        {rap.danhSachPhim?.slice(0,5).map((phim,index)=>{
                                          return <>
                                            <div className='flex my-3'  key={index}>
                                                <div>
                                                    <img className='w-20 h-20' src={phim.hinhAnh} alt={phim.tenPhim}
                                                      onError={e=>{
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://picsum.photos/80'
                                                      }}
                                                    ></img>
                                                </div>
                                                <div className='ml-3'>
                                                    <p className='font-bold text-base'>{phim.tenPhim}</p>
                                                    <div className='grid grid-cols-6'>
                                                        {phim.lstLichChieuTheoPhim?.slice(0,6).map((lichChieu,index)=>{
                                                          return <NavLink to={`/checkout/${lichChieu.maLichChieu}`} key={index} className='mt-6 p-1  mr-3 text-green-400 border border-green-400 bg-green-100 rounded-lg transition-all duration-500 hover:bg-white hover:text-green-400'>
                                                              {moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}
                                                          </NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                          </div>
                                          <hr/>
                                          </>
                                        })}
                                  </TabPane>
                                })}
                      </Tabs>
            </TabPane>
        })
    }
    return (
        <Tabs tabPosition={'left'}>
          {renderHeThongRap()}
      </Tabs>
    )
}
