import TopNavBar from "../components/TopNavBar";
import { Link, useLocation } from "react-router-dom";
import OrderDetail from "../components/OrderDetail";
//import{auth} from '../Firebase'

const OrderDetailPage = () => {
  //console.log("USER", auth.currentUser);

  //const {id} = useParams();
  const location = useLocation();

  const curr_order = location.state.order || {};
  const user = sessionStorage.getItem("discord_name");
  const pathname = location.pathname;

  //console.log("STATE", location);

  //console.log("ORDER", curr_order);

  //console.log("USER", user);
  //TODO something wrong with back button state when
  return (
    <>
      <TopNavBar state={undefined} />
      <br />
      <h1 className="body-style">
        <Link to="/" className="button" state={{ current_user: user }}>
          Back
        </Link>
      </h1>
      <br />

      <div className="body-style">
        <OrderDetail order={curr_order} user={user} pathname={pathname} />
      </div>
    </>
  );
};

export default OrderDetailPage;

//<OrderDetail orderId={orderId}/>
