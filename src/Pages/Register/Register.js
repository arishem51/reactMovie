import React from 'react'
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { history } from '../../App';
import { quanLyNguoiDung } from '../../Services/QuanLyNguoiDungService';
import { useDispatch } from 'react-redux';
import { DANG_NHAP } from '../../redux/type/MovieType';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction';
import { TOKEN, USER_LOGIN } from '../../Util/Setting';

export default function Register() {
    localStorage.removeItem(USER_LOGIN);
    localStorage.removeItem(TOKEN);
    const dispatch = useDispatch()
    const phoneNumber = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    const formik = useFormik({
        initialValues:{
            taiKhoan:'',
            hoTen:'',
            email:'',
            matKhau:'',
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
        onSubmit : async values=>{
            try {
                const {data,status} = await quanLyNguoiDung.dangKy(values);
                if(status === 200){
                    alert("Đăng ký người dùng thành công")
                    dispatch({
                        type:DANG_NHAP,
                        userLogin : {
                            taiKhoan : values.taiKhoan,
                            matKhau : values.matKhau
                        }
                    })
                    history.push('/home')
                }else{
                    alert("Đăng ký người dùng không thành công")
                }
                
            } catch (error) {
                console.log(error)
            }
        }
    })

    return (
        <div className='w-1/4'>
                <h3 className='text-center mt-6 mb-2 font-bold text-4xl'>Register</h3> 
                <p className='text-center text-base text-gray-500 mb-6'>Enter your information to register</p>    
                <form className='w-full px-10' onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-2 gap-x-4 gap-y-2'>
                        <div >
                            <label className='block mb-1 text-gray-400 font-bold'>Tài khoản</label>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} name='taiKhoan' placeholder='taiKhoan' className='border-2 border-gray-200 rounded-md py-2 w-full px-2'></Input>
                            {formik.errors.taiKhoan && formik.touched.taiKhoan ? <p className='text-red-400 font-bold mt-1'>{formik.errors.taiKhoan}</p> : ''}
                        </div>
                        <div >
                            <label className='block mb-1 text-gray-400 font-bold'>Tên</label>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} name='hoTen' placeholder='Tên' className='border-2 border-gray-200 rounded-md py-2 px-2 w-full'></Input>
                            {formik.errors.hoTen && formik.touched.hoTen ? <p className='text-red-400 font-bold mt-1'>{formik.errors.hoTen}</p> : ''}

                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-1 text-gray-400 font-bold'>Email</label>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' placeholder='Email' type='email' className='border-2 border-gray-200 rounded-md py-2 w-full px-2'></Input>
                            {formik.errors.email && formik.touched.email ? <p className='text-red-400 font-bold mt-1'>{formik.errors.email}</p> : ''}

                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-1 text-gray-400 font-bold'>Mật Khẩu</label>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} name='matKhau' placeholder='Password' type='password' className='border-2 border-gray-200 rounded-md py-2 w-full px-2'></Input>
                            {formik.errors.matKhau && formik.touched.matKhau ? <p className='text-red-400 font-bold mt-1'>{formik.errors.matKhau}</p> : ''}
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-1 text-gray-400 font-bold'>Số Điện Thoại</label>
                            <Input onBlur={formik.handleBlur} onChange={formik.handleChange} name='soDt' placeholder='Số Điện Thoại' type='text' className='border-2 border-gray-200 rounded-md py-2 w-full px-2'></Input>
                            {formik.errors.soDt && formik.touched.soDt ? <p className='text-red-400 font-bold mt-1'>{formik.errors.soDt}</p> : ''}
                        </div>
                    </div>
                    <div className='w-11/12 mx-auto mt-3'>
                            <Button htmlType='submit' className='w-full border-2 rounded-md'>Register</Button>
                    </div>
                </form>       
        </div>
    )
}
