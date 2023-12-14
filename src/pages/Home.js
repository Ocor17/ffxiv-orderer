import TopNavBar from "../components/TopNavBar";
import OrderList from "../components/OrderList";
import AuthDetails from "../components/auth/AuthDetails";


function HomePage(){

    return(
    <>
        <TopNavBar/>
        <div>
            <OrderList/>
        </div>
    </>
    );
}

export default HomePage;
