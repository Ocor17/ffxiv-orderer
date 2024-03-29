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
      <h1 className="body-style ml-10">
        <Link to="/orderlist" state={{ current_user: user }}>
          <Button className=" hover:bg-blue-800 hover:text-white">Back</Button>
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
