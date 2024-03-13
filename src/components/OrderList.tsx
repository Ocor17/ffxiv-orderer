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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Timestamp } from "firebase/firestore";

/**
 * OrderList
 *
 * Displays a list of orders retrieved from Firestore.
 *
 * @returns JSX.Element
 *
 */

//Really hacky workaround to get pagination behavior correct because Firebase is weird.
const OrderList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [orders, setOrders] = useState<Order[]>([]);
  const [next, setNext] = useState(true);
  const [limit, setLimit] = useState(5);
  const [time, setTime] = useState<Timestamp>(new Timestamp(0, 0));

  // Fetch orders from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        //inital value to start the process.

        const data = await getOrders(time, next, limit);

        setOrders(data);
        //setResult(data);

        //console.log(result);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchData();
  }, [time, page, next, limit]);

  //TODO clean if-else statements to be like handleNextPage
  const handlePreviousPage = async () => {
    if (page > 1) {
      setPage(page - 1);
      setNext(false);
      setTime(orders[0]?.order_date);
    } else return;
  };

  const handleNextPage = async () => {
    if (orders.length <= limit) return;

    setNext(true);
    setPage(page + 1);
    setTime(orders[orders.length - 1]?.order_date);
  };

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
        {
          //use of slice to display up to limit but keep the last element for pagination

          orders
            .slice(0, orders.length <= limit ? orders.length : -1)
            .map(({ id, orderer, current_status, date, details, crafter }) => (
              <TableBody key={id}>
                <TableRow
                  className="hover:cursor-pointer"
                  key={id}
                  onClick={() => {
                    navigate(`/orders/${id}`, {
                      state: {
                        order: {
                          id,
                          orderer,
                          current_status,
                          date,
                          details,
                          crafter,
                        },
                      },
                    });
                  }}
                >
                  <TableCell className="font-medium">{orderer}</TableCell>
                  <TableCell>{current_status}</TableCell>
                  <TableCell>{new Date(date).toDateString()}</TableCell>
                  <TableCell>{details.substring(0, 40)}...</TableCell>
                  <TableCell className="text-right">{crafter}</TableCell>
                </TableRow>
              </TableBody>
            ))
        }
      </Table>

      <Pagination className=" mx-auto flex justify-center items-center align-middle">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                page <= 1 ? "disabled opacity-55" : "hover:cursor-pointer"
              }
              onClick={handlePreviousPage}
              aria-disabled={page <= 1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="hover:cursor-pointer">
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                orders.length <= limit
                  ? "disabled opacity-55"
                  : "hover:cursor-pointer"
              }
              onClick={handleNextPage}
              aria-disabled={orders.length <= limit}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <div className=" mt-4 mx-auto flex justify-center items-center align-middle size-fit">
        <Select
          onValueChange={(value) => {
            setLimit(Number(value));
            setPage(1);
            setNext(true);
            setTime(new Timestamp(0, 0));
          }}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Results per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="25">25</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default OrderList;
