import TopNavBar from "../components/TopNavBar";
import OrderList from "../components/OrderList";

function HomePage() {
  return (
    <>
      <TopNavBar />
      <div className="body-style">
        <OrderList />
      </div>
    </>
  );
}

export default HomePage;
