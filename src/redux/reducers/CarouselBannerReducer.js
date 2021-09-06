import { SET_CAROUSEL } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
        listBanner:[
        ]
    }

export default (state = initialState,action) => {
    switch (action.type) {
        case SET_CAROUSEL:{
            return {...state,listBanner:action.listBanner}
        }
    
    default:
        return state
    }
}
