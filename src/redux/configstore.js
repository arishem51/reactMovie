import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import CarouselBannerReducer from './reducers/CarouselBannerReducer'
import QuanLyPhimReducer from './reducers/QuanLyPhimReducer'
import QuanLyRapReducer from './reducers/QuanLyRapReducer'
import QuanLyNguoiDungReducer from './reducers/QuanLyNguoiDungReducer'
import QuanLyDatVeReducer from './reducers/QuanLyDatVeReducer'
import LoadingReducer from './reducers/LoadingReducer'
import DrawerMovieReducer from './reducers/DrawerMovieReducer'

const rootReducer = combineReducers({
    CarouselBannerReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    DrawerMovieReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk))