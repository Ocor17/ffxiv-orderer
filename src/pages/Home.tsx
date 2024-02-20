import TopNavBar from "../components/TopNavBar";
import OrderList from "../components/OrderList";
import "../../app/globals.css";

function HomePage() {
  return (
    <>
      <TopNavBar state={undefined} />
      <div className="body-style">
        <OrderList />
      </div>
    </>
  );
}

export default HomePage;
