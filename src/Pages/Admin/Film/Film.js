import React, { Fragment, useEffect } from 'react'
import { Table, Button, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction, layDanhSachPhimAction2, xoaPhimAction } from '../../../redux/actions/QuanLyPhimAction';
import { NavLink } from 'react-router-dom';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { history } from '../../../App';



export default function Film() {
    const {listFilm} = useSelector(state => state.QuanLyPhimReducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(layDanhSachPhimAction2());
    },[])
    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            width:100,
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections:['descend','ascend'],
            defaultSortOrder:'descend',
            render : (text)=>{
                return <span className='py-1 px-2 rounded-md border border-green-500 bg-green-100 text-green-600 '>{text}</span>
            }
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'Hình Ảnh',
            width:100,
            render: (text,film,index)=>{
                return <Fragment>
                        <img src ={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError = {(e)=>{ e.target.onError = null ; e.target.src = `https://picsum/id/${index}/50/50`}} />
                </Fragment>
            }
        },
        {
            title: 'Tên Phim',
            dataIndex: 'tenPhim',
            width:300,
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if(tenPhimA > tenPhimB){
                    return 1;
                }
                return -1;
            },
            sortDirections:['descend','ascend'],
            defaultSortOrder:'descend'
        },
        {
            title: 'Mô Tả',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if(moTaA > moTaB){
                    return 1;
                }
                return -1;
            },
            sortDirections:['descend','ascend'],
            defaultSortOrder:'descend'
        },
        {
            title: 'Hành động',
            dataIndex: 'maPhim',
            render: (text, film) => {
                return <Fragment>
                    <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/edit/${film.maPhim}`}><EditOutlined style={{ color: 'blue' }} /> </NavLink>
                    <span  onClick={()=>{
                        if(window.confirm(`Bạn có chắc muốn xóa phim ${film.tenPhim} không`)){
                            dispatch(xoaPhimAction(film.maPhim))
                        }
                    }}  style={{ cursor: 'pointer' }} key={2} className="text-2xl" ><DeleteOutlined style={{ color: 'red' }} /> </span>

                    <NavLink  key={1} className="cursor-pointer mr-2 text-2xl" to={`/admin/films/showtime/${film.maPhim}`} ><CalendarOutlined style={{ color: 'green' }} /> </NavLink>
                </Fragment>
            },
            sortDirections: ['descend', 'ascend'],
            width: '10%'
        },
    ];
    const data = listFilm;
    
    const { Search } = Input;
    const onSearch = value => {
        console.log(value)
        dispatch(layDanhSachPhimAction2(value))
    };
    console.log(listFilm)
    function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
    }
    return (
        <div className='container mx-auto'>
            <h1 className='mb-5 text-4xl font-bold text-center'>Quản lý Phim</h1>
            <Button className='my-4' onClick={()=>{
                history.push('/admin/films/addnew')
            }}>Thêm Phim</Button>
            <Search
                className='mb-5'
                placeholder="Tìm Kiếm Người Dùng"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} onChange={onChange} rowKey={"maPhim"}/>
        </div>
    )
}
