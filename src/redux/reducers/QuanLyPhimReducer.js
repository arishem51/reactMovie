import { FILM_EDIT, SET_FILMDETAIL, SET_FILM_LIST } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    listFilm:[
    ],
    filmDetail:{},
    filmEdit:{},
}

export default (state = initialState, action) => {
    switch (action.type) {

        case SET_FILM_LIST:{
            return {...state,listFilm:action.listFilm}
        }
        case SET_FILMDETAIL:{
            return {...state,filmDetail:action.filmDetail}
        }
        case FILM_EDIT:{
            return {...state,filmEdit:action.filmEdit}
        }
    default:
        return state
    }
}
