import { connection } from "../../index";
import { quanLyDatVeService } from "../../Services/QuanLyDatVeService"
import { ThongTinDatVe } from "../../_core/Models/ThongTinDatVe";
import { DAT_GHE, DAT_VE_HOAN_TAT, HIDE_LOADING, IS_LOADING, SET_CHI_TET_PHONG_VE } from "../type/MovieType";
import { DISPLAY_LOADING_ACTION, HIDE_LOADING_ACTION } from "./LoadingAction";

export const layChiTietPhongVeAction = (maLichChieu)=>{
    return async dispatch =>{
        try {
            const {data,status} = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            if(status === 200){
                dispatch({
                    type: SET_CHI_TET_PHONG_VE,
                    chiTietPhongVe: data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) =>{
    return async (disaptch,getState)=>{
        try {
            disaptch(DISPLAY_LOADING_ACTION)
            const {data,status}  = await quanLyDatVeService.datVe(thongTinDatVe);
            await disaptch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await disaptch({type:DAT_VE_HOAN_TAT})
            const userLogin = getState(state => state.QuanLyNguoiDungReducer);
            await connection.invoke('datGheThanhCong',userLogin.taiKhoan,thongTinDatVe.maLichChieu);
        } catch (error) {   
            console.log(error)
        }
        disaptch(HIDE_LOADING_ACTION)
    }
}

export const datGheAction = (ghe,maLichChieu)=>{
    return async (dispatch,getState) =>{
        await dispatch({
            type: DAT_GHE,
            gheDuocChon: ghe
        })

        let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
        let taiKhoan = getState().QuanLyNguoiDungReducer.userLogin.taiKhoan;
        danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
        connection.invoke('datGhe',taiKhoan,danhSachGheDangDat,maLichChieu);
    }
}