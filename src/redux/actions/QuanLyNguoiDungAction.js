import { history } from "../../App";
import { quanLyNguoiDung } from "../../Services/QuanLyNguoiDungService"
import { CLOSE_DRAWER, DANG_NHAP, SET_LIST_USERS, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../type/MovieType";

export const dangNhapAction = (thongTinDangNhap)=>{
    return async dispatch =>{
        try {
            const {data,status} = await quanLyNguoiDung.dangNhap(thongTinDangNhap);
            if(status === 200){
                dispatch({
                    type:DANG_NHAP,
                    userLogin:data.content
                })
                history.goBack();
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinNguoiDungAction = ()=>{
    return async dispatch =>{
        try {
            const {data,status} = await quanLyNguoiDung.layThongTinNguoiDung();
            if(status === 200){
                dispatch({
                    type:SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung:data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layThongTinLoaiNguoiDungAction = ()=>{
    return async dispatch =>{
        try {
            const {data,status} = await quanLyNguoiDung.layDanhSachLoaiNguoiDung();
            if(status === 200){
                dispatch({
                    type:SET_LOAI_NGUOI_DUNG,
                    loaiNguoiDung:data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const layDanhSachNguoiDung = (value)=>{
    return async disaptch =>{
        try {
            const {data,status} = await quanLyNguoiDung.layDanhSachNguoiDung(value);
            if(status === 200){
                disaptch({
                    type:SET_LIST_USERS,
                    listUser:data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const xoaNguoiDungAction = (taiKhoan)=>{
    return async dispatch =>{
        try {
            const {data,status} = await quanLyNguoiDung.xoaNguoiDung(taiKhoan);
            if(status === 200){
                alert('Xóa Người Dùng Thành Công');
                dispatch({type : CLOSE_DRAWER})
                dispatch(layDanhSachNguoiDung());
            }
        } catch (error) {
            alert('Xóa Người Dùng Không Thành Công');
            console.log(error)
        }
    }
}
