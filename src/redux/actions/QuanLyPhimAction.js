import { quanLyPhimService } from "../../Services/QuanLyPhimServices"
import { FILM_EDIT, SET_FILM_LIST } from "../type/MovieType";

export const layDanhSachPhimAction = async (dispacth)=>{
    try{
        const result = await quanLyPhimService.laydanhSachPhim();
        if(result.status === 200){
            dispacth({
                type: SET_FILM_LIST,
                listFilm:result.data.content
            })
        }

    }catch(err){
        console.log(err)
    }
}

export const layDanhSachPhimAction2 = (tenPhim='')=>{
    return async dispacth =>{
        try {
            const result = await quanLyPhimService.laydanhSachPhim(tenPhim);
            if(result.status === 200){
                dispacth({
                    type: SET_FILM_LIST,
                    listFilm:result.data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const themPhimUploadHinhAction = (formdata)=>{
    return async dispatch =>{
        try {
            const {data,status} = await quanLyPhimService.themPhimUploadHinh(formdata);
           if(status === 200){
            alert('Them phim thanh cong')
           }
           console.log(data.content)
        } catch (error) {
            console.log(error)
        }
    }
}

export const layFilmEditAction = id =>{
    return async dispatch=>{
        try {
            const {data,status} = await quanLyPhimService.layFilmEdit(id);
            if(status === 200){
                dispatch({
                    type:FILM_EDIT,
                    filmEdit : data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const edidFilmUploadAction = formdata =>{
    return async dispacth=>{
        try {
            const {data,status} = await quanLyPhimService.editFilmUpload(formdata);
            if(status === 200){
                alert("cap nhat phim thanh cong")
            }
        } catch (error) {
                console.log(error)
        }
    }
}


export const xoaPhimAction = maPhim =>{
    return async disaptch =>{
        try {
            const {data,status} = await quanLyPhimService.xoaPhim(maPhim)
            if(status === 200){
                alert("Xóa phim thành công");
                disaptch(layDanhSachPhimAction2());
            }
        } catch (error) {
            console.log(error)
        }
    }
}