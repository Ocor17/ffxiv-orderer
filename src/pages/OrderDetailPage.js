import React from "react";
import TopNavBar from "../components/TopNavBar";
import { Link, useLocation } from "react-router-dom";
import OrderDetail from "../components/OrderDetail";
//import{auth} from '../Firebase'

const OrderDetailPage = () => {
  //console.log("USER", auth.currentUser);

  //const {id} = useParams();
  const location = useLocation();

  const curr_order = location.state.order || {};
  const user = location.state.user || {};
  console.log("STATE", location);

  console.log("ORDER", curr_order);
  console.log("USER", user);

  return (
    <>
      <TopNavBar />
      <h2 className="body-style">
        <Link to="/" className="button">
          Back
        </Link>
      </h2>

      <div className="body-style">
        <OrderDetail order={curr_order} user={user} />
      </div>
    </>
  );
};

export default OrderDetailPage;

//<OrderDetail orderId={orderId}/>
