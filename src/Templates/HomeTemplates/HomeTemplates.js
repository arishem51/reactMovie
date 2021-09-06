import { Route } from "react-router";
import CarouselComponent from "../../Components/Layout/CarouselComponent/CarouselComponent";
import Footer from "../../Components/Layout/Footer/Footer";
import Header from "../../Components/Layout/Header/Header";
import HomeMenu from "../../Pages/HomeMenu/HomeMenu";

export const HomeTemplate = props =>{
    const {Component,...restProps} = props;
    return <Route {...restProps} render={(propsRoute)=>{
        return <>
            <Header {...propsRoute}></Header>
            <Component {...propsRoute}></Component>
            <Footer></Footer>
        </>
    }}>
    </Route>
}