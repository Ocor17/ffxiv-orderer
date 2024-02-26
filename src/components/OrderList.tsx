import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Order, getOrders } from "./Firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Timestamp } from "firebase/firestore";

/**
 * OrderList
 *
 * Displays a list of orders retrieved from Firestore.
 *
 * @returns JSX.Element
 *
 */

//TODO decide to get rid of orders or results since they kinda are the same thing
const OrderList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orders, setOrders] = useState<Order[]>([]);
  const [result, setResult] = useState<Order[]>([]);
  const [time, setTime] = useState<Timestamp>();
  // Fetch orders from Firestore

  useEffect(() => {
    const fetchData = async () => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setResult(await getOrders(time));
        //result = await getOrders(result[result.length - 1]["order_date"]);
        setOrders(result);
        console.log(result[result.length - 1]["order_date"]);

        //setUser(location.state.current_user || {});
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [time]);

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

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="hover:cursor-pointer"
              onClick={() => {
                if (page > 1) {
                  setPage(page - 1);
                  //navigate(`/home/${page}`, { state: { page } });
                  setTime(result[0]["order_date"]);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="hover:cursor-pointer">
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis className="hover:cursor-pointer" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="hover:cursor-pointer"
              onClick={() => {
                setPage(page + 1);
                setTime(result[result.length - 1]["order_date"]);
                //navigate(`/home/${page}`, { state: { page } });

                //navigate(`/home/${page}`, { state: { page } });
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default OrderList;
