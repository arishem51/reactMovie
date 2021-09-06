import { TOKEN, USER_LOGIN } from "../../Util/Setting"
import { DANG_NHAP, SET_LIST_USERS, SET_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */

let user = {};
if(localStorage.getItem(USER_LOGIN)){
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
    userLogin :user,
    thongTinNguoiDung:{},
    loaiNguoiDung:[],
    listUser:[],
    editUser:{},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case DANG_NHAP:{
            localStorage.setItem(USER_LOGIN,JSON.stringify(action.userLogin))
            localStorage.setItem(TOKEN,action.userLogin.accessToken)
            return {...state,userLogin:action.userLogin}
        }
        case SET_THONG_TIN_NGUOI_DUNG:{
            return {...state,thongTinNguoiDung:action.thongTinNguoiDung}
        }
        case SET_LOAI_NGUOI_DUNG:{
            return {...state,loaiNguoiDung:action.loaiNguoiDung}
        }
        case SET_LIST_USERS :{
            return {...state,listUser:action.listUser}
        }
    default:
        return {...state}
    }
}
