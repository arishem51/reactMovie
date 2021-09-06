/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Button, Input ,Select  } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { quanLyNguoiDung } from '../../../Services/QuanLyNguoiDungService';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDung, layThongTinLoaiNguoiDungAction, layThongTinNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';
import { CLOSE_DRAWER } from '../../../redux/type/MovieType';


const { Option } = Select;
export default function AddNewUser() {
    const {loaiNguoiDung} = useSelector(state => state.QuanLyNguoiDungReducer);
    const dispatch = useDispatch();
    const phoneNumber = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{
            taiKhoan:'',
            hoTen:'',
            email:'',
            matKhau:'',
            maloaiNguoiDung: loaiNguoiDung[0]?.maLoaiNguoiDung,
            soDt:'',
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
                const {data,status} = await quanLyNguoiDung.themNguoiDung(values);
                if(status === 200){
                    alert('Thêm Người Dùng Thành Công')
                    dispatch({
                        type:CLOSE_DRAWER
                    })
                    dispatch(layDanhSachNguoiDung())
                }
              
            } catch (error) {
                alert('Thêm Người Dùng Không Thành Công')
                console.log(error)
            }
        },
    })
    useEffect(()=>{
        dispatch(layThongTinLoaiNguoiDungAction())
    },[])
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='col-span-1'>
                        <label className='text-lg '>Tài Khoản</label>
                        <Input name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur} className='mt-1'></Input>
                        {formik.errors.taiKhoan && formik.touched.taiKhoan ? <p className='text-red-400 mt-1'>{formik.errors.taiKhoan}</p> : ''}
                    </div>
                    <div className='col-span-1'>
                        <label className='text-lg '>Họ Và Tên</label>
                        <Input name='hoTen' onChange={formik.handleChange} onBlur={formik.handleBlur} className='mt-1'></Input>
                        {formik.errors.hoTen && formik.touched.hoTen ? <p className='text-red-400 mt-1'>{formik.errors.hoTen}</p> : ''}

                    </div>
                    <div className='col-span-2'>
                        <label className='text-lg '>Email</label>
                        <Input  name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} className='mt-1'></Input>
                        {formik.errors.email && formik.touched.email ? <p className='text-red-400 mt-1'>{formik.errors.email}</p> : ''}
                    </div>
                    <div className='col-span-2'>
                        <label className='text-lg '>Mật Khẩu</label>
                        <Input name='matKhau' onChange={formik.handleChange} type='password' onBlur={formik.handleBlur} className='mt-1'></Input>
                        {formik.errors.matKhau && formik.touched.matKhau ? <p className='text-red-400 mt-1'>{formik.errors.matKhau}</p> : ''}

                    </div>
                    <div className='col-span-2'>
                        <label className='text-lg '>Số Điện Thoại</label>
                        <Input name='soDt' onChange={formik.handleChange} onBlur={formik.handleBlur} className='mt-1'></Input>
                        {formik.errors.soDt && formik.touched.soDt ? <p className='text-red-400 mt-1'>{formik.errors.soDt}</p> : ''}
                    </div>
                    <div className='col-span-2'>
                        <label className='text-lg block'>Loại Người Dùng</label>
                        <Select className='w-1/3' value={formik.values.maloaiNguoiDung} onChange={(values)=>{
                            formik.setFieldValue('maLoaiNguoiDung',values)
                        }}>
                            {loaiNguoiDung?.map((item,index)=>{
                                return <Option value={item.maLoaiNguoiDung} key={index}>
                                    {item.tenLoai}
                                </Option>
                            })}
                        </Select>
                    </div>
                    <div className='col-span-2'>
                        <Button htmlType='submit' className='w-full mt-3 h-10'>Thêm</Button>
                    </div>
                   
                </div> 
            </form>
        </div>
    )
}
