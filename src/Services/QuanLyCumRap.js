/* eslint-disable no-useless-constructor */
import { baseService } from "./baseServices";

export class QuanLyRapSerivce extends baseService{
    constructor(){
        super()
    }

    layThongTinHeThongRap = ()=>{
       return this.get(`api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`);
    }

    layLichChieuPhimDetail = maPhim=>{
        return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    layTTHTR = ()=>{
        return this.get('api/QuanLyRap/LayThongTinHeThongRap')
    }
    layCumRap = maRap =>{
        return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maRap}`)
    }
    taoLichChieu = (thongTinLichChieu)=>{
        return this.post(`api/QuanLyDatVe/TaoLichChieu`,thongTinLichChieu)
    }
}

export const quanLyRapSerivce = new QuanLyRapSerivce();