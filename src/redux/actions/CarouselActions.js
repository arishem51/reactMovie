import axios from "axios"
import { quanLyPhimService } from "../../Services/QuanLyPhimServices"
import { DOMAIN } from "../../Util/Setting"
import { SET_CAROUSEL } from "../type/MovieType"

export const getCarouse = async (dispacth) =>{
    try{
        const result = await quanLyPhimService.layDanhSachBanner()
        if(result.status === 200){
            dispacth({
                type: SET_CAROUSEL,
                listBanner:result.data.content
            })
        }

    }catch(err){
        console.log(err)
    }
}