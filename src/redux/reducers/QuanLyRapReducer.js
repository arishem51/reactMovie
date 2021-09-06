import { SET_HTRAPCHIEU } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    heThongRap:[],
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_HTRAPCHIEU:{
        return {...state,heThongRap:action.heThongRap}
    }

    default:
        return state
    }
}
