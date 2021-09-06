/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Checkbox ,Cascader,DatePicker , InputNumber ,Select} from 'antd';
import moment from 'moment';
import { quanLyRapSerivce } from '../../../Services/QuanLyCumRap';
import { useFormik } from 'formik';

export default function Showtime(props) {

    const formik =  useFormik({
        initialValues:{
            maPhim:props.match.params.id,
            ngayChieuGioChieu:'',
            maRap:'',
            giaVe:''
        },
        onSubmit : async (values) => {
            try {
                const {data,status} = await quanLyRapSerivce.taoLichChieu(values);
                if(status === 200){
                    alert('Tạo lịch chiếu thành công')
                }
            } catch (error) {
                console.log(error)
            }
        }
    })
    const [state,setState] = useState({
        heThongRapChieu:[],
        cumRapChieu:[],
    })
    useEffect(async ()=>{
        try {
            let {data,status} = await quanLyRapSerivce.layTTHTR();
            if(status === 200){
                setState({
                    ...state,
                    heThongRapChieu:data.content
                })
            }
           
        } catch (error) {
            console.log(error)
        }
    },[])
    const onChangeCascader = async (values)=>{
        try {
            const {data,status} = await quanLyRapSerivce.layCumRap(values);
            if(status === 200){
                setState({
                    ...state,
                    cumRapChieu:data.content
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    function onChangeNumber(value) {
        formik.setFieldValue('giaVe',value)
      }
    function onChangeDate(values, dateString) {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
      }
      
      function onOk(values) {
        formik.setFieldValue('ngayChieuGioChieu',moment(values).format('DD/MM/YYYY hh:mm:ss'))
      }
      const handleChangeCumRap = (value) => {
        formik.setFieldValue('maRap',value)
    }
    return (
        <div className='container mx-auto'>
            <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 4 }}
      initialValues={{ remember: true }}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
      autoComplete="off"
      onSubmitCapture={formik.handleSubmit}
    >
        <h3>Tạo Lịch Chiếu</h3>
      <Form.Item
        label="Hệ Thống Rạp"
      >
          <Select options={state.heThongRapChieu?.map((htr,index)=>{return {label:htr.tenHeThongRap,value:htr.maHeThongRap}})} onChange={onChangeCascader} placeholder="Chọn hệ thống rạp" />
      </Form.Item>


      <Form.Item
        label="Cụm Rạp"
      >
          <Select options={state.cumRapChieu?.map((cumRap,index)=>({label:cumRap.tenCumRap,value:cumRap.maCumRap}))} onChange={handleChangeCumRap} placeholder="Chọn rạp" />
      </Form.Item>

      <Form.Item
        label="Ngày Chiếu Và Giờ Chiếu"
      >
          <DatePicker showTime onChange={onChangeDate} onOk={onOk} />
      </Form.Item>

      <Form.Item
        label="Giá Vé (VNĐ)"
      >
          <InputNumber min={75000} max={150000} onChange={onChangeNumber} />
      </Form.Item>


      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
        </div>
    )
}
