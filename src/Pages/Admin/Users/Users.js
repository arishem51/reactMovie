/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useReducer, useState } from 'react'
import { Button, Input, Space,Table, Tag ,Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { quanLyNguoiDung } from '../../../Services/QuanLyNguoiDungService';
import { NavLink } from 'react-router-dom';
import { ADD_NEW_USER, EDIT_USER, OPEN_DRAWER } from '../../../redux/type/MovieType';
import AddNewUser from './AddNewUser';
import EditUser from './EditUser';
import { layDanhSachNguoiDung, xoaNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

export default function Users() {
    const dispatch = useDispatch();
    let {listUser} = useSelector(state => state.QuanLyNguoiDungReducer)
    listUser = listUser?.map((item,index)=>{
        return {...item,STT:index}
    })
    useEffect( ()=>  {
        dispatch(layDanhSachNguoiDung())
    },[])

    const columns = [
        {
          title: 'STT',
          dataIndex: 'STT',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
        },
        {
          title: 'Họ Và Tên',
          dataIndex: 'hoTen',
        },
       
        {
          title: 'Email',
          dataIndex:'email',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex:'soDt',
          },
        {
          title: 'Hành Động',
         render: ((text,record,index)=>{
             console.log(record)
             return <Space>
                        <Button onClick={()=>{
                            dispatch({
                                type:EDIT_USER,
                                Component: <EditUser></EditUser>,
                                editUser:record
                            })
                        }}>Sửa</Button>
                        <Popconfirm placement="top" title='Bạn Có Muốn Xóa Người Này Chứ' onConfirm={()=>{
                            dispatch(xoaNguoiDungAction(record.taiKhoan))
                        }}  cancelText="No">
                               <Button>Xóa</Button>
                        </Popconfirm>
             </Space>
         })
        },
      ];
      const data = listUser;
    const { Search } = Input;
    const onSearch = value => {
        dispatch(layDanhSachNguoiDung(value))
    };
    return (
        <div className='container mx-auto'>
            <h3 className='text-center text-4xl font-bold'>Quản Lý Người Dùng</h3>
            <div className='w-1/2 mx-auto mb-6'>
                <Search size='large' className='mt-5 w-full' placeholder="Tìm kiếm người dùng" onSearch={onSearch} enterButton />
            </div>
            <div className='mb-3'>
                <Button onClick={()=>{
                    dispatch({
                        type:ADD_NEW_USER,
                        Component: <AddNewUser></AddNewUser>,
                    })
                }} >Thêm Người Dùng</Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey='index' />
        </div>
    )
}
