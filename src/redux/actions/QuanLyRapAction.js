import { quanLyRapSerivce } from "../../Services/QuanLyCumRap"
import { SET_FILMDETAIL, SET_HTRAPCHIEU } from "../type/MovieType";

export const layDanhSachCumRap = async (dispatch) =>{
    try{
        const result = await quanLyRapSerivce.layThongTinHeThongRap();
        if(result.status === 200){
            dispatch({
                type: SET_HTRAPCHIEU,
                heThongRap:result.data.content
            })
        }

    }catch(err){
        console.log(err)
    }
}


export const layLichChieuPhimAction = (maPhim)=>{
    return async dispatch =>{
        try{
            const {data,status} = await quanLyRapSerivce.layLichChieuPhimDetail(maPhim);
            if(status === 200){
                dispatch({
                    type :SET_FILMDETAIL,
                    filmDetail:data.content
                })
            }
        }catch(err){
            console.log(err)
        }
    }
}



