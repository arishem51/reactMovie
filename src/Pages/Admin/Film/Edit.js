import React, { useEffect, useState } from 'react';
import * as Yup from 'yup'
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { edidFilmUploadAction, layFilmEditAction, } from '../../../redux/actions/QuanLyPhimAction';

const Edit = (props) => {

  const [componentSize, setComponentSize] = useState('default');
  const [imgSrc, setImgSrc] = useState('');
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(layFilmEditAction(props.match.params.id))
    },[])
    const {filmEdit} = useSelector(state => state.QuanLyPhimReducer);
  const formik = useFormik({
      enableReinitialize:true,
    initialValues: {
      tenPhim: filmEdit?.tenPhim,
      trailer: filmEdit?.trailer,
      moTa: filmEdit?.moTa,
      ngayKhoiChieu: filmEdit?.ngayKhoiChieu,
      dangChieu: filmEdit?.dangChieu,
      sapChieu: filmEdit?.sapChieu,
      hot: filmEdit?.hot,
      danhGia: filmEdit?.danhGia,
      hinhAnh: null,
      maNhom:"GP00",maPhim: filmEdit.maPhim,
    },
    validationSchema : Yup.object().shape({
        tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
        trailer: Yup.string().required('Trailer không được bỏ trống'),
        moTa: Yup.string().required('Mô tả không được bỏ trống'),
    }),
    onSubmit: (values) => {
      values.maNhom = 'GP00';
      //Tạo đối tượng formdata => Đưa giá trị values từ formik vào formdata
      let formData = new FormData();
      for (let key in values) {
        if (key !== 'hinhAnh') {
          formData.append(key, values[key]);
        } else {
            if(values.hinhAnh !== null){
                formData.append('File', values.hinhAnh, values.hinhAnh.name);
            }
        }
      }
      dispatch(edidFilmUploadAction(formData))
    }
  })
  const handleChangeDatePicker = (value) => {
    // console.log('datepickerchange',);
    let ngayKhoiChieu = moment(value);
    formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu);
  }

  const handleChangeFile = async (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    // 'image/png, image/jpeg , image/gif , image/jpg'
    if(file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'|| file.type === 'image/jpg' ||file.type === 'image/gif'  ){
        await formik.setFieldValue('hinhAnh',file)
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload=  e =>{
            setImgSrc(e.target.result)
        }
    }
   
  }
  const handleChangeSwitch = (name)=>{
      return value =>{
        formik.setFieldValue(name,value)
      }
  }

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <>

      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <h3 className='text-4xl text-center mb-3'>Edit Phim</h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Tên phim">
          <Input name="tenPhim"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tenPhim}/>
          {formik.touched.tenPhim && formik.errors.tenPhim ? <p className='text-red-500 mt-1 font-bold'>{formik.errors.tenPhim}</p> : ''}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input name="trailer"  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.trailer} />
          {formik.touched.trailer && formik.errors.trailer ? <p className='text-red-500 mt-1 font-bold'>{formik.errors.trailer}</p> : ''}

        </Form.Item>
        <Form.Item label="Mô tả">
          <Input name="moTa" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.moTa} />
          {formik.touched.moTa && formik.errors.moTa ? <p className='text-red-500 mt-1 font-bold'>{formik.errors.moTa}</p> : ''}

        </Form.Item>
        <Form.Item label="Ngày khởi chiếu">
          <DatePicker format="DD/MM/YYYY" value={moment(formik.values.ngayKhoiChieu)} onChange={handleChangeDatePicker} onBlur={formik.handleBlur}/>
        </Form.Item>
        <Form.Item label="Đang chiếu" >
          <Switch name='dangChieu' onChange={handleChangeSwitch('dangChieu')}   defaultChecked={formik.values.dangChieu}/>
        </Form.Item>
        <Form.Item label="Sắp chiếu">
          <Switch onChange={handleChangeSwitch('sapChieu')} name = 'sapChieu'  checked={formik.values.sapChieu}/>
        </Form.Item>
        <Form.Item label="Hot">
          <Switch onChange={handleChangeSwitch('hot')} name='hot'  defaultChecked={formik.values.hot}/>
        </Form.Item>

        <Form.Item label="Số sao">
          <InputNumber value={formik.values.danhGia} onChange={(value)=> formik.setFieldValue('danhGia',value)} min={1} max={10} onBlur={formik.handleBlur}/>
        </Form.Item>

        <Form.Item label="Hình ảnh">
          <input type="file" onChange={handleChangeFile} onBlur={formik.handleBlur}/>
          <br />
          <img style={{width:'150px',height:'150px'}} src={imgSrc === '' ? filmEdit.hinhAnh : imgSrc} alt='' accept = 'image/png, image/jpeg , image/gif , image/jpg'></img>
        </Form.Item>
        <Form.Item label="Tác vụ">
          <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật</button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Edit