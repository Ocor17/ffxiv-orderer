import { Key, useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../Firebase";
import Linkify from "react-linkify";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type webhookSource = string | URL | Request;

//TODO Revisit this to check it it's safe to use with component
//Formats a potential link to make it a clickable hyperlink
const formatTextWithLinks = (text: string) => {
  return (
    <Linkify
      componentDecorator={(
        decoratedHref: string | undefined,
        _decoratedText: unknown,
        key: Key | null | undefined
      ) => (
        <a
          className="hover:text-blue-800 underline hover:font-bold"
          href={decoratedHref}
          target="_blank"
          key={key}
        >
          TC LINK
        </a>
      )}
    >
      {text}
    </Linkify>
  );
};

//TODO reflect crafter update on page in realtime

/**
 * Takes the selected order from Orderlist and displays it in a card.
 * The user has the ablity to use the select component to change the status of the order.
 *
 * @param props - contains the order object from Orderlist
 * @returns JSX.Element - the order detail card
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const OrderDetail = (props: any) => {
  console.log(props);
  const date = new Date(props.order.date).toDateString();
  const [status, setStatus] = useState(props.order.current_status);
  const [crafter, setCrafter] = useState(props.order.crafter);
  //keeps orderer from being pinged on page load when status is already delivered.
  const [originalStatus, setOriginalStatus] = useState(
    props.order.current_status
  );

  /**
   * Commuicates with discord's webhook to send a message to the orderer
   * @param  webhookURL - the webhook url given from Discord. can be a string or URL
   * @param  message - the message to be sent to the orderer
   */
  const webhookMessage = async (webhookURL: webhookSource, message: string) => {
    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const STATUS_CHOICES: { [key: string]: string } = {
    ordered: "ordered",
    inProgress: "in progress",
    done: "done",
    delivered: "delivered",
    archived: "archived",
  };

  //Add checks so Crafter doesn't get overwritten if another crafter is already working
  useEffect(() => {
    /**
     * Updates the order status in the database while also updating the crafter if the status is ordered.
     *
     * @returns void
     *
     */
    const updateOrder = async () => {
      if (status === "ordered") {
        setCrafter("");
      }
      console.log("Status", status);
      const orderRef = doc(database, "orders", props.order.id);
      await updateDoc(orderRef, {
        current_status: status,
        crafter: crafter,
      });
    };

    /**
     * Pings the orderer if the order is delivered if it it is not initially delivered and sends a discord message that will ping the orderer.
     *
     * @returns void
     *
     */
    const pingOrderer = async () => {
      if (status === "delivered" && originalStatus !== "delivered") {
        const webhookURL = String(process.env.REACT_APP_WEBHOOK_URL);

        const message = `<@${props.order.orderer_discord}> an order has been delivered`;
        webhookMessage(webhookURL, String(message));
      }
    };

    updateOrder();
    pingOrderer();
    setOriginalStatus(status);
  }, [status, originalStatus, props, crafter]);

  return (
    <>
      <div className="ml-10">
        <h2></h2>
        {props.order ? (
          <div className="flex mb-10">
            <Card className="min-w-fit max-w-fit mx-left  shadow-md rounded-lg overflow-hidden mr-1  ">
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent>
                <strong>Requestor: </strong> {props.order.orderer}
                <br />
                <strong>Order date: </strong> {date}
                <br />
                <strong>Crafter: </strong> {crafter}
                <br />
                <strong>Current status: </strong> {status}
                <br />
                <strong>Change status: </strong>
                <Select
                  onValueChange={(value) => {
                    setCrafter(props.user);
                    setStatus(value);
                    //handleStatusChange(e.target.value)
                  }}
                >
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Change Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Statuses</SelectLabel>
                      {Object.keys(STATUS_CHOICES).map((key) => (
                        <SelectItem key={key} value={key}>
                          {STATUS_CHOICES[key]}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <br />
              </CardContent>
            </Card>
            <div className="max-content">
              <Card className="max-w-prose text-wrap  shadow-md rounded-lg  w-full mr-1">
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent className="text-wrap">
                  {formatTextWithLinks(props.order.details)}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default OrderDetail;
