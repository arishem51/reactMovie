/* eslint-disable no-useless-constructor */
import { baseService } from "./baseServices";

export class QuanLyNguoiDung extends baseService{
    constructor(){
        super()
    }
    dangNhap = (thongTinDangNhap)=>{ //Tai khoan va mk
        return this.post(`api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
 
    layThongTinNguoiDung = ()=>{
        return this.post(`api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
    dangKy = (thongTinDangKy)=>{
        return this.post(`api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }

    layDanhSachNguoiDung = (tuKhoa='')=>{
       if(tuKhoa.length > 0){
           return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00&tuKhoa=${tuKhoa}`)
       }
       return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP00`)
    }
    themNguoiDung = (thongTinNguoiDung) =>{
        return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`,thongTinNguoiDung);
    }
    layDanhSachLoaiNguoiDung = ()=>{
        return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
    }
    suaThongTinNguoiDung = (thongTinNguoiDung)=>{
        return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTinNguoiDung)
    }
    xoaNguoiDung = (taiKhoan)=>{
        return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
}

export const quanLyNguoiDung = new QuanLyNguoiDung();