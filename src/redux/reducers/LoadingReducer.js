import { HIDE_LOADING, IS_LOADING } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    isLoading:false
}

export default (state = initialState,action) => {
    switch (action.type) {

    case IS_LOADING:
        return { ...state, isLoading:true}
    case HIDE_LOADING :{
        return {...state,isLoading:false}
    }
    default:
        return state
    }
}
