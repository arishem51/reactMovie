import React, { useEffect } from 'react'
import { StarFilled } from '@ant-design/icons'
import { CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Tabs, Radio, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layLichChieuPhimAction } from '../../redux/actions/QuanLyRapAction';
import moment from 'moment'
import { Rate } from 'antd';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
const { TabPane } = Tabs;
export default function Detail(props) {
    const dispatch = useDispatch();
    const { filmDetail } = useSelector(state => state.QuanLyPhimReducer);

    useEffect(() => {
        let { id } = props.match.params;
        dispatch(layLichChieuPhimAction(id));
    }, [])

    const value = filmDetail.danhGia === undefined ? 0 : filmDetail.danhGia;
    return (
        <div className='relative' style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100vh', backgroundPosition: 'center', backgroundSize: 'contain' }}>
            <div className='absolute top-0' style={{ height: '1000px', paddingTop: '200px', width: '100%', background: 'linear-gradient(to top, rgb(10, 32, 41), transparent 100%' }}></div>
            <CustomCard
                style={{ height: '1000px', paddingTop: '200px' }}
                effectColor="rgba(255,255,255,.4)" // required
                color="rgba(255,255,255,.4)" // default color is white
                blur={10} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='flex w-3/6 mx-auto justify-between'>
                    <div className='flex'>
                        <div>
                            <img className='rounded-md' style={{ minWidth: '250px', height: '350px' }} src={`${filmDetail.hinhAnh}`} alt='hihi'>
                            </img>
                        </div>
                        <div className='ml-4 flex items-center'>
                            <div>
                                <p className='text-lg  text-white'>Ngày Chiếu: {moment(filmDetail.ngayKhoiChieu).format("DD - MM - YYYY")}</p>
                                <p className='text-2xl font-bold text-yellow-600'>{filmDetail.tenPhim}</p>
                                <p className='text-white'>{filmDetail.moTa}</p>
                                <p>129 phút - 0 IMDb - 2D/Digital</p>

                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='text-center'>
                            <div style={{ width: '126px', height: '127px', marginLeft: '14px' }} >
                                <CircularProgressbar value={value} maxValue={10} text={`${value.toFixed(1)}`} styles={buildStyles({
                                    textSize: '40px',
                                    textColor: 'white',
                                    pathColor: 'rgb(126,211,33)'
                                })} />;
                            </div>
                            <Rate allowHalf value={value / 2} />
                            <p className='text-xl'>{(Math.random() * 1000).toFixed(0)} người đánh giá</p>
                        </div>
                    </div>
                </div>
                <div className='mt-20 w-2/3 mx-auto bg-white py-3 rounded-md'>
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Lịch Chiếu" key="1">
                            <Tabs tabPosition='left'>
                              {filmDetail.heThongRapChieu?.map((item, index) => {
                                    return <TabPane tab={
                                        <div className='flex justify-center'>
                                            <div>
                                                <img className='w-12' src={item.logo} alt={item.logo}></img>
                                            </div>
                                            <div className='capitalize ml-3 self-center'>
                                                {item.tenHeThongRap}
                                            </div>
                                        </div>
                                    } key={index}>
                                        {item.cumRapChieu?.map((cumRap,index)=>{
                                            return <div key={index}>
                                                <div className='flex mb-3'>
                                                        <div>
                                                            <img className='w-12' src={cumRap.hinhAnh} alt={index}></img>
                                                        </div>
                                                        <div className='ml-3'>
                                                            <p>{cumRap.tenCumRap}</p>
                                                            <p>{cumRap.diaChi}</p>
                                                        </div>
                                                </div>
                                                <div className='flex'>
                                                    <div>
                                                        <p className='text-black'>Giá Vé: {cumRap.lichChieuPhim?.slice(0,1).map((item,index)=>{
                                                            return <span>{`${item.giaVe.toLocaleString()} đ`}</span>
                                                        })}</p>
                                                    </div>
                                                    <div className='ml-24'>
                                                        {cumRap.lichChieuPhim?.slice(0,5).map((item,index)=>{
                                                            return <NavLink to={`/checkout/${item.maLichChieu}`} className='transition duration-500 hover:bg-white p-1 rounded-md cursor-pointer border border-green-400 text-green-400 bg-green-200 mx-8'>{moment(item.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        })}
                                    </TabPane>
                                })}
                                {/* filmDetail.heThongRapChieu?.map((item, index) => {
                                    return <TabPane tab={
                                        <div className='flex justify-center'>
                                            <div>
                                                <img className='w-12' src={item.logo} alt={item.logo}></img>
                                            </div>
                                            <div className='capitalize ml-3 self-center'>
                                                {item.tenHeThongRap}
                                            </div>
                                        </div>
                                    } key={index}>
                                        Content of Tab 1
                                    </TabPane>
                                }) */}
                            </Tabs>
                        </TabPane>
                        <TabPane tab="Thông Tin" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="Đánh Giá" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>

                </div>
            </CustomCard>
        </div>
    )
}
