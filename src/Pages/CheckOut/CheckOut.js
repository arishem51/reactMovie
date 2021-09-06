/* eslint-disable import/no-anonymous-default-export */
import React, { Fragment, useEffect } from 'react'
import { Redirect } from 'react-router'
import { USER_LOGIN } from '../../Util/Setting'
import style from './Checkout.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVe, datVeAction, layChiTietPhongVeAction } from '../../redux/actions/QuanLyRapVeAction';
import { CheckOutlined, CloseOutlined, UserOutlined, SmileOutlined, HomeOutlined } from '@ant-design/icons'
import './Checkout.css'
import { DAT_GHE, SET_DANH_SACH_GHE_KHACH_DAT } from '../../redux/type/MovieType';
import _ from 'lodash'
import { ThongTinDatVe } from '../../_core/Models/ThongTinDatVe';
import { Tabs } from 'antd';
import { layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../../index';

const { TabPane } = Tabs;

function CheckOut(props) {
    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat ,danhSachGheKhachDangDat} = useSelector(state => state.QuanLyDatVeReducer);
    const disaptch = useDispatch();
    useEffect(() => {
        disaptch(layChiTietPhongVeAction(props.match.params.id));

        connection.on('datVeThanhCong',()=>{
            disaptch(layChiTietPhongVeAction(props.match.params.id));
        })

        connection.invoke('loadDanhSachGhe',props.match.params.id);

        connection.on('loadDanhSachGheDaDat',(dsGheKhachDat)=>{
            dsGheKhachDat = dsGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan)

            //Gop ds ghe khach dat
            let arrGheKhachDat = dsGheKhachDat.reduce((result,item,index)=>{
                let arrGhe = JSON.parse(item.danhSachGhe);
                return [...result,...arrGhe]
            },[])

            arrGheKhachDat = _.unionBy(arrGheKhachDat,'maGhe');
            disaptch({
                type:SET_DANH_SACH_GHE_KHACH_DAT,
                danhSachGheKhachDangDat:arrGheKhachDat
            })

            window.addEventListener("beforeunload", clearGhe);

         return () => {
             clearGhe();
             window.removeEventListener('beforeunload',clearGhe);
         }
        })
    }, [])

    const clearGhe = function(event) {
        
        connection.invoke('huyDat',userLogin.taiKhoan,props.match.params.id);

            
    }

    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    const renderGhe = () => {
        return danhSachGhe.map((ghe, index) => {
            const classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
            const classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
            let classGheDangDat = '';
            let classGheDaDuocDat = '';
            if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
                classGheDaDuocDat = 'gheDaDuocDat'
            }
            let indexGheDD = danhSachGheDangDat?.findIndex(item => item.maGhe === ghe.maGhe)
            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }
            let classGheKhachDaDat = '';

            let indexGheKhachDat = danhSachGheKhachDangDat?.findIndex(item => item.maGhe === ghe.maGhe);
            if(indexGheKhachDat !== -1){
                classGheKhachDaDat = 'gheKhachDat'
            }

            return <Fragment key={index}>
                <button onClick={() => {
                    const action = datGheAction(ghe,props.match.params.id);
                    disaptch(action)

                }} disabled={ghe.daDat || classGheKhachDaDat !== ''} className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} ${classGheKhachDaDat}`} key={index}>
                    {ghe.daDat ? (classGheDaDuocDat === '' ? <CloseOutlined ></CloseOutlined> : <UserOutlined></UserOutlined> ): (classGheKhachDaDat === '' ? ghe.stt : <SmileOutlined></SmileOutlined>)}
                </button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>
        })
    }
    return (
        <div >
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex flex-col items-center mt-5'>
                        <div className='bg-black' style={{ width: '80%', height: '15px' }}></div>
                        <div className={`${style['trapezoid']}`}>
                            <h3 className='mt-3 text-black text-center font-bold'>Màn Hình</h3>
                        </div>
                        <div >
                            {renderGhe()}
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center">
                        <table className=" divide-y divide-gray-200 w-2/3">
                            <thead className="bg-gray-50 p-5">
                                <tr>
                                    <th>Ghế chưa đặt</th>
                                    <th>Ghế đang đặt</th>
                                    <th>Ghế vip</th>
                                    <th>Ghế đã đặt</th>
                                    <th>Ghế mình đặt</th>
                                    <th>Ghế khách đang đặt</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className='text-center'><button className="ghe text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td className='text-center'><button className="ghe gheDangDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td className='text-center'><button className="ghe gheVip text-center"><CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /></button> </td>
                                    <td className='text-center'><button className="ghe gheDaDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td className='text-center'><button className="ghe gheDaDuocDat text-center"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                    <td className='text-center'><button className="ghe gheKhachDat"> <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} /> </button> </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-span-3 relative'>
                    <h3 className='text-green-800 text-center text-6xl font-bold'>
                        {danhSachGheDangDat?.reduce((tongTien, ghe, index) => {
                            return tongTien += ghe.giaVe
                        }, 0).toLocaleString() + 'đ'}
                    </h3>
                    <hr />
                    <h3 className='font-bold my-1 text-xl'>{thongTinPhim.tenPhim}</h3>
                    <p className='font-bold my-1'>Địa Điểm: {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}</p>
                    <p className='font-bold my-1'>Ngày Chiếu: {thongTinPhim.ngayChieu} - {thongTinPhim.gioiThieu}</p>
                    <hr />
                    <div className='flex flex-row my-5 justify-between'>
                        <div className='w-4/5 flex flex-wrap items-center'>
                            <span className='text-red-400 font-bold  text-lg'>Ghế: </span>
                            {_.sortBy(danhSachGheDangDat, ['stt'])?.map((item, index) => {
                                if (item.loaiGhe !== 'Vip') {
                                    return <span key={index} className='text-green-300 font-bold mx-1'>{item.stt}</span>
                                }
                                return <span key={index} className='text-red-600 font-bold mx-1'>V{item.stt}</span>
                            })}
                        </div>
                        <div className='col-span-1 text-right mr-2'>
                            <span className='text-green-800 text-base font-bold'>
                                {danhSachGheDangDat?.reduce((tongTien, ghe, index) => {
                                    return tongTien += ghe.giaVe
                                }, 0).toLocaleString() + 'đ'}
                            </span>
                        </div>
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i>Email: </i>
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i>Phone</i>
                        {userLogin.soDT}
                    </div>
                    <hr />
                    <div onClick={() => {
                        const thongTinDatve = new ThongTinDatVe();
                        thongTinDatve.maLichChieu = props.match.params.id;
                        thongTinDatve.danhSachVe = danhSachGheDangDat;
                        disaptch(datVeAction(thongTinDatve))
                    }} style={{ bottom: '0', left: '25px' }} className='rounded-md w-11/12 cursor-pointer absolute border-2 border-transparent  bg-yellow-500 text-white text-center capitalize font-bold text-xl py-4 hover:bg-white hover:border-yellow-500 hover:text-yellow-500 transition-all duration-500'>
                        Đặt Vé
                    </div>
                </div>
            </div>
        </div>
    )
}

function KetQuaDatVe(props) {
    const { thongTinNguoiDung, userLogin } = useSelector(state => state.QuanLyNguoiDungReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layThongTinNguoiDungAction());
    }, [])


    return <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-700">Lịch Sử Đặt Vé</h1>
            </div>
            <div className="flex flex-wrap -m-2">


                {thongTinNguoiDung.thongTinDatVe?.map((item, index) => {
                    return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={item.hinhAnh} />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">{item.tenPhim}</h2>
                                <p className="text-gray-500">Ngày Chiếu: {moment(item.ngayDat).format('hh:mm A - DD-MM-YYYY')}</p>
                            </div>
                        </div>
                    </div>
                })}





            </div>
        </div>
    </section>

}

export default function (props) {
    return <div className='px-5'>
        <Tabs defaultActiveKey="1">
            <TabPane tab="01 CHỌN GHÊ & THANH TOÁN" key="1">
                <CheckOut {...props}></CheckOut>
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props}></KetQuaDatVe>
            </TabPane>
        </Tabs>
    </div>
}