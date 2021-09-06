import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Loading() {

    const {isLoading} = useSelector(state => state.LoadingReducer);
    return (
       <Fragment>
           {isLoading ?  <div className='fixed top-0 left-0 bottom-0 right-0 flex justify-center items-center z-50' style={{backgroundColor:'rgba(0,0,0,.7)'}}>
                  <img src={require('../../Assets/loading.gif').default} alt='loading'></img>
        </div> : ''}
       </Fragment>
    )
}
