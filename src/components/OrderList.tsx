import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrders } from "./Firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

//TODO Fix location.state is null form back button

const OrderList = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<any[]>([]);
  //console.log("USER AUTH", getUserAuth());

  // Fetch orders from Firestore

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    <>
      <Table>
        <TableCaption>Crafting Orders</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Orderer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Details</TableHead>
            <TableHead className="text-right">Crafter</TableHead>
          </TableRow>
        </TableHeader>
        {orders.map((order) => (
          <TableBody>
            <TableRow
              className="hover:cursor-pointer"
              key={order.id}
              onClick={() => {
                navigate(`/orders/${order.id}`, { state: { order } });
              }}
            >
              <TableCell className="font-medium">{order.orderer}</TableCell>
              <TableCell>{order.current_status}</TableCell>
              <TableCell>{new Date(order.date).toDateString()}</TableCell>
              <TableCell>{order.details.substring(0, 40)}...</TableCell>
              <TableCell className="text-right">{order.crafter}</TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </>
  );
};

export default OrderList;
