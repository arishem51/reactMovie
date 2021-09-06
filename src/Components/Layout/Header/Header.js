import _ from 'lodash';
import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { history } from '../../../App'
import { TOKEN, USER_LOGIN } from '../../../Util/Setting';

export default function Header() {
    const {userLogin} = useSelector(state => state.QuanLyNguoiDungReducer);
    const renderLogin = ()=>{
        if(_.isEmpty(userLogin)){
            return <Fragment>
                 <button onClick={() => {
                        history.push('/login')
                    }} className="self-center px-8 py-3 rounded">Sign in</button>
                    <button className="self-center px-8 py-3 font-semibold rounded bg-violet-600 text-coolGray-50" onClick={()=>{
                        history.push('/register')
                    }}>Sign up</button>
            </Fragment>
        }
        return  <Fragment> <button onClick={() => {
            history.push(`/profile/${userLogin.taiKhoan}`)
        }} className="self-center px-8 py-3 rounded">Hello ! {userLogin.taiKhoan}</button>
            <button onClick={() => {
                localStorage.removeItem(USER_LOGIN);
                localStorage.removeItem(TOKEN);
                history.push('/home');
                window.location.reload();
            }} className="text-yellow-500 mr-5">Đăng xuất</button>
        </Fragment>
    }
    return (
        <header className="p-4 bg-coolGray-100 text-coolGray-800 text-white bg-opacity-75 fixed w-full z-10 bg-black" >
            <div className="container flex justify-between h-16 mx-auto">
                <NavLink to="/home" aria-label="Back to homepage" classname="flex items-center bg-opacity-75 p-2">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAoCAYAAADt5povAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAZ5JREFUeNrsmIttwyAQhiHqAO4EpROEEZwNMkJGYIO2k7gbeAS6gdMJnA3sDeiddEkJhRowRqrUXzr5yX32gbnDjC3IGNOAncB6sMn81ETX8J6G5YpArwFISBO1aVJhEmw0+cK2MhZ2MuV0WoIdTXkdQzCR2F8p/Sp8wN5sp943SLaWtIFdBWCHLE7ACTb5H22cZs754wPA2gowFE4k7Q52WlZPEoFPFYF7BIqKQMErDZjvgYPjteIbsn/g3wfurP03sMsGjAv5vk3cd7M5bFWhvIg+lJuN8EDTfusk42EFbLCTLvqm8xpDeqbzNyDM6hiGA9h7RgixzYF8MMf32a5jxkDp0aXmPI+P8a6+sfpMBerTITKMjae9uvZp6C1kRoHlLZSc0qVzHdpSvzypTzH3i6W+0m5NGQjt4Kltdahvud1XsBk9qWoG+wD7pOMX5/r1o97TaPS1f4ZRO7PEsOVKLZX7uiBMxyxmRMGpLa58KRRalbpG7IutJRJWwFNmKPOKMpopUpfcclX2TICuhyWs+cdisIW/Gsl/Lb4EGAAieokIfKReCAAAAABJRU5ErkJggg==" classname="w-7" alt="logo" />
                </NavLink>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    <li className="flex">
                        <NavLink activeClassName='border-b-2 border-blue-500' to='/home' className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600">Home</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeClassName='border-b-2 border-blue-500' to='/new' className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600">New</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink activeClassName='border-b-2 border-blue-500' to='/contact' className="flex items-center -mb-0.5 border-b-2 px-4 border-transparent text-violet-600 border-violet-600">Contact</NavLink>
                    </li>
                </ul>
                <div className="items-center flex-shrink-0 hidden lg:flex">
                    {renderLogin()}
                   
                </div>
                <button className="p-4 lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-coolGray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </header>

    )
}
