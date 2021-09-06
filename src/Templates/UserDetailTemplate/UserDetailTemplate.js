import React from 'react'
import { Redirect, Route } from 'react-router';
import Footer from '../../Components/Layout/Footer/Footer';
import Header from '../../Components/Layout/Header/Header';
import { USER_LOGIN } from '../../Util/Setting';

 const UserDetailTemplate = (props)=> {
    const {Component,...restProps} = props;
    if(localStorage.getItem(USER_LOGIN)){
        return (
            <Route {...restProps} render={propsRoute=>{
                return <>
                    <Header {...propsRoute}></Header>
                    <Component {...propsRoute}></Component>
                    <Footer></Footer>
                </>
            }}></Route>
        )
    }
        return <Redirect to='/login'></Redirect>
}

export default UserDetailTemplate