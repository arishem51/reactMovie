import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { layDanhSachNguoiDung, layThongTinNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { USER_LOGIN } from '../../Util/Setting';
import { Button, Input, Tabs } from 'antd';
import { useFormik } from 'formik';
import *  as Yup from 'yup'
import { quanLyNguoiDung } from '../../Services/QuanLyNguoiDungService';
import moment from 'moment';

const { TabPane } = Tabs;

export default function Profile(props) {
    const phoneNumber = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(layDanhSachNguoiDung());
        dispatch(layThongTinNguoiDungAction());
    }, [])
    const { listUser, userLogin ,thongTinNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    const thisUser = listUser?.find(item => item.taiKhoan === userLogin.taiKhoan);
    console.log(thongTinNguoiDung)
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            taiKhoan:thisUser?.taiKhoan,
            matKhau:thisUser?.matKhau,
            email:thisUser?.email,
            maLoaiNguoiDung:thisUser?.maLoaiNguoiDung,
            hoTen:thisUser?.hoTen,
            soDt:thisUser?.soDt,
            maNhom:"GP00"
        },
        validationSchema:Yup.object().shape({
            taiKhoan: Yup.string().required("Tài khoản không được bỏ trống"),
            hoTen: Yup.string().required("Tên không được bỏ trống"),
            email: Yup.string().required("Email không được bỏ trống").email("Email không hợp lệ"),
            matKhau: Yup.string().required("Mật khẩu không được bỏ trống"),
            soDt:Yup.string().required("Số điện thoại không được bỏ trống").matches(phoneNumber,'Số điện thoại không hợp lệ'),
        }),
        onSubmit: async values=>{
            try {
                const {data,status} = await quanLyNguoiDung.suaThongTinNguoiDung(values);
                if(status === 200){
                    alert('Sửa Thông Tin Người Dùng Thành Công')
                    dispatch(layDanhSachNguoiDung());
                }
            } catch (error) {
                alert("Sửa Thông Tin Người Dùng Không Thành Công")
                console.log(error)
            }
        }
    })
    const [state,setState] = useState(false)
    return (
        <div className='container mx-auto'>
            <div className='w-full'>
                <img className='w-full' alt='anhBia' src="https://a-static.besthdwallpaper.com/lien-minh-huyen-thoai-lol-hau-tuoc-vladimir-hinh-nen-3440x1440-55717_15.jpg">
                </img>
            </div>
            <div>
                <h3 className='text-center text-4xl font-bold my-5'>{thisUser?.hoTen}</h3>
            </div>
            <div>
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Thông Tin Cá Nhân" key="1">
                        <form className='w-1/2 mx-auto' onSubmit={formik.handleSubmit}>
                            <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <label className='block'>Tài Khoản</label>
                                        <Input className='w-3/4' readOnly onChange={formik.handleChange} onBlur={formik.handleBlur} name='taiKhoan' value = {formik.values.taiKhoan}></Input>
                                    </div>
                                    <div>
                                        <label className='block'>Tên</label>
                                        <Input className='w-3/4' onChange={formik.handleChange} onBlur={formik.handleBlur} name='hoTen' value = {formik.values.hoTen}></Input>
                                    </div>
                                    <div>
                                        <label className='block'>Email</label>
                                        <Input className='w-3/4' onChange={formik.handleChange} onBlur={formik.handleBlur} name='email' value = {formik.values.email}></Input>
                                    </div>
                                    <div>
                                        <label className='block'>Mật Khẩu</label>
                                        <Input className='w-3/4' type='password' onChange={formik.handleChange} onBlur={formik.handleBlur} name='matKhau' value = {formik.values.matKhau}></Input>
                                    </div>
                                    <div>
                                        <label className='block'>Số Điện Thoại</label>
                                        <Input className='w-3/4' onChange={formik.handleChange} onBlur={formik.handleBlur} name='soDt' value = {formik.values.soDt}></Input>
                                    </div>
                                    <div className='flex items-end'>
                                        <Button htmlType='submit '>Cập Nhật</Button>
                                    </div>
                            </div>
                        </form>
                    </TabPane>
                    <TabPane tab="Lịch Sử Đặt Vé" key="2">
                        <div className='w-1/2 mx-auto'>
                                {thongTinNguoiDung?.thongTinDatVe.map((item,index)=>{
                                    return <div className='flex my-3' key={index}>
                                            <div>
                                                <img src={item.hinhAnh} alt={item.hinhAnh} style={{height:'100px',width:'150px'}}></img>
                                            </div>
                                            <div className='ml-2'>
                                                <p className='text-xl'>{item.tenPhim}</p>
                                                <div className='flex'>
                                                    Địa Điểm : {item.danhSachGhe.slice(0,1).map((ghe,index)=>{
                                                        return <p py-1 px-2 >{ghe.tenHeThongRap}</p>
                                                    })}
                                                </div>
                                                <div className='flex'>
                                                    Thời Gian : {moment(item.NgayDat).format('DD-MM-YYYY')}
                                                </div>
                                            </div>
                                    </div>
                                })}
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )

}
