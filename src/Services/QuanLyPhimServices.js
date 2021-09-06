/* eslint-disable no-useless-constructor */
import { baseService } from "./baseServices";

export class QuanLyPhimService extends baseService{
    constructor(){
        super()
    }

    layDanhSachBanner =()=>{
        return this.get(`api/QuanLyPhim/LayDanhSachBanner`)
    }

    laydanhSachPhim = (tenPhim='')=>{
        if(tenPhim.trim() !== ''){
            return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=${tenPhim}`)
        }
        return this.get('api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00')
    }
    themPhimUploadHinh = (formdata) =>{
        return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`,formdata)
    }
    layFilmEdit = id =>{
        return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
    }

    editFilmUpload = (formdata)=>{
        return this.post(`api/QuanLyPhim/CapNhatPhimUpLoad`,formdata)
    }

    xoaPhim = maPhim =>{
        return this.delete(`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
}

export const quanLyPhimService = new QuanLyPhimService();