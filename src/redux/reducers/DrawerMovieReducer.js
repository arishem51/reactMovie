import React from 'react'

import { ADD_NEW_USER, CLOSE_DRAWER, EDIT_USER, OPEN_DRAWER } from "../type/MovieType"

/* eslint-disable import/no-anonymous-default-export */
const initialState = {
    visible:false,
    Component:<span>123</span>,
    title:'Basic Drawer',
    editUser:{},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DRAWER:{
            return {...state,visible:true}
        }
        case CLOSE_DRAWER:{
            return {...state,visible:false}
        }
        case ADD_NEW_USER:{
            return {...state,visible:true,Component:action.Component,title:'Add New User'}
        }
        case EDIT_USER:{
            return {...state,visible:true,Component:action.Component,title:'Edit User',editUser:action.editUser}
        }
    default:
        return {...state}
    }
}
