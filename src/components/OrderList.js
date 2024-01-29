import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { getOrders } from "./Firestore";
import { getUserAuth } from "./Firestore";
//TODO Fix location.state is null form back button
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(getUserAuth());
  //const location = useLocation();
  //console.log("ORDERLIST LOCATION:", location);

  console.log("USER AUTH", getUserAuth());

  //console.log("ORDERLIST CURRENT USER:", user);

  // Fetch orders from Firestore

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrders();

        setOrders(result);
        //setUser(location.state.current_user || {});
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Available Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="orderSpace">
              <Link
                className="orderList"
                to={`/orders/${order.id}`}
                state={{ order }}
              >
                {order.orderer} - {order.current_status}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available</p>
      )}
    </div>
  );
};

export default OrderList;
