import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "./Firestore";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getOrders();

        setOrders(result);
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
                state={{ curr_order: order }}
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
