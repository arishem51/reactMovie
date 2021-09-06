import React from 'react'
import { Redirect, Route } from 'react-router';
import { USER_LOGIN } from '../../Util/Setting';

 const CheckOutTemplates = (props)=> {
    const {Component,...restProps} = props;
    if(localStorage.getItem(USER_LOGIN)){
        return (
            <Route {...restProps} render={propsRoute=>{
                return <>
                    <Component {...propsRoute}></Component>
                </>
            }}></Route>
        )
    }
        return <Redirect to='/login'></Redirect>
}

export default CheckOutTemplates
