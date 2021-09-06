/* eslint-disable react/jsx-no-undef */
import logo from './logo.svg';
import './App.css';
import BaiTapTongHop from './BaiTapTongHop/BaiTapTongHop';
import {createBrowserHistory} from 'history'
import {Router,Switch,Route} from 'react-router-dom'
import { HomeTemplate } from './Templates/HomeTemplates/HomeTemplates';
import Home from './Pages/Home';
import New from './Pages/New/New';
import Contact from './Pages/Contact/Contact';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Detail from './Pages/Detail/Detail';
import CheckOutTemplates from './Templates/CheckOutTemplates/CheckOutTemplates';
import CheckOut from './Pages/CheckOut/CheckOut';
import {Suspense,lazy} from 'react'
import { UserTemplates } from './Templates/UserTemplates/UserTemplates';
import UserDetailTemplate from './Templates/UserDetailTemplate/UserDetailTemplate';
import Loading from './Components/Loading/Loading';
import Profile from './Pages/Profile/Profile';
import AdminTemplate from './Templates/AdminTemplates/AdminTemplate';
import Dashboard from './Pages/Admin/Dashboard/Dashboard';
import Film from './Pages/Admin/Film/Film';
import Showtime from './Pages/Admin/Showtime/Showtime';
import Users from './Pages/Admin/Users/Users';
import AddNew from './Pages/Admin/Film/AddNew';
import Edit from './Pages/Admin/Film/Edit';
import AddNewUser from './Pages/Admin/Users/AddNewUser';
import DrawerMovie from './Components/DrawerMovie/DrawerMovie';


export const history = createBrowserHistory();
// const CheckOutTemplatesLazy = lazy(()=> import('./Templates/CheckOutTemplates/CheckOutTemplates') )

function App() {
  return (
    <Router history={history}>
        <DrawerMovie></DrawerMovie>
        <Loading></Loading>
      <Switch>
        <HomeTemplate path='/home' exact Component={Home}></HomeTemplate>
        <HomeTemplate path='/detail/:id' exact Component={Detail}></HomeTemplate>
        <HomeTemplate path='/new' exact Component={New}></HomeTemplate>
        <HomeTemplate path='/contact' exact Component={Contact}></HomeTemplate>
        <UserDetailTemplate path='/profile/:taiKhoan' exact Component={Profile}></UserDetailTemplate>
        <AdminTemplate path='/admin' exact Component={Users}></AdminTemplate>
        <AdminTemplate path='/admin/users' exact Component={Users}></AdminTemplate>
        <AdminTemplate path='/admin/films' exact Component={Film}></AdminTemplate>
        <AdminTemplate path='/admin/films/showtime/:id' exact Component={Showtime}></AdminTemplate>
        <AdminTemplate path='/admin/films/addnew' exact Component={AddNew}></AdminTemplate>
        <AdminTemplate path='/admin/films/edit/:id' exact Component={Edit}></AdminTemplate>
        {/* <Suspense>
        </Suspense> */}
        <CheckOutTemplates path='/checkout/:id' exact Component={CheckOut}></CheckOutTemplates>
        <UserTemplates path='/login' exact Component={Login}></UserTemplates>
        <UserTemplates path='/register' exact Component={Register}></UserTemplates>
        <HomeTemplate path='/' exact Component={Home}></HomeTemplate>
      </Switch>
    </Router>
  );
}

export default App;
