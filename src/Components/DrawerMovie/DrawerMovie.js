import React, { useState } from 'react'
import { Drawer, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER } from '../../redux/type/MovieType';
import './DrawerMovie.css'

export default function DrawerMovie() {
    const dispatch = useDispatch();
    const {visible ,Component,title} = useSelector(state => state.DrawerMovieReducer);
    const onClose = () => {
        dispatch({type:CLOSE_DRAWER})
    };
    return (
        <div>
      <Drawer style={{width:'300px'}} title={title} placement="right" onClose={onClose} visible={visible}>
          {Component}
      </Drawer>
        </div>
    )
}
