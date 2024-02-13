import TopNavBar from "../components/TopNavBar";
import { Link, useLocation } from "react-router-dom";
import OrderDetail from "../components/OrderDetail";
import { Button } from "@/components/ui/button";

const OrderDetailPage = () => {
  const location = useLocation();

  const curr_order = location.state.order || {};
  const user = sessionStorage.getItem("discord_name");
  const pathname = location.pathname;

  return (
    <>
      <TopNavBar state={undefined} />
      <br />
      <h1 className="body-style">
        <Link to="/home" state={{ current_user: user }}>
          <Button className="bg-white text-black hover:bg-blue-800 hover:text-white">
            Back
          </Button>
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
