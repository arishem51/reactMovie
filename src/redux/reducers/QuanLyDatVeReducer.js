import { ThongTinPhongVe } from "../../_core/Models/ThongTinPhongVe"
import { DAT_GHE, DAT_VE_HOAN_TAT, SET_CHI_TET_PHONG_VE, SET_DANH_SACH_GHE_KHACH_DAT } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    chiTietPhongVe: new ThongTinPhongVe(),
    danhSachGheDangDat:[],
    danhSachGheKhachDangDat:[]
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHI_TET_PHONG_VE:{
            return {...state,chiTietPhongVe:action.chiTietPhongVe}
        }
        case DAT_GHE:{
            const danhSachGheDangDatUpdate = [...state.danhSachGheDangDat];
            let index = danhSachGheDangDatUpdate.findIndex( item => item.maGhe === action.gheDuocChon.maGhe)
            if(index !== -1){
                danhSachGheDangDatUpdate.splice(index,1);
            }else{
                danhSachGheDangDatUpdate.push(action.gheDuocChon)
            }
            state.danhSachGheDangDat = [...danhSachGheDangDatUpdate]
            return {...state}
        }
        case DAT_VE_HOAN_TAT:{
            return {...state,danhSachGheDangDat:[]}
        }
        case SET_DANH_SACH_GHE_KHACH_DAT:{
            return {...state,danhSachGheKhachDangDat:action.danhSachGheKhachDangDat}
        }
    default:
        return {...state}
    }
}
