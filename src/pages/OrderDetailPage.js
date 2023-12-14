import React from "react";
import TopNavBar from "../components/TopNavBar";
import {Link, useLocation} from 'react-router-dom';
import OrderDetail from "../components/OrderDetail";
import{auth} from '../Firebase'


const OrderDetailPage = () =>{

    console.log("USER", auth.currentUser);

    //const {id} = useParams();
    const location = useLocation();

    const {curr_order } = location.state || {};


    return(
    <>
        <TopNavBar/>
        <h2>
            <Link to="/" className="button">Back</Link>
        </h2>

        

        <div>
            <OrderDetail order={curr_order} />
        </div>
    </>
    );
}

export default OrderDetailPage;


//<OrderDetail orderId={orderId}/>