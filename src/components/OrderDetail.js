import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../Firebase";

const OrderDetail = (props) => {
  //console.log(props.order)

  const date = new Date(props.order.date).toDateString();
  const [status, setStatus] = useState(props.order.current_status);
  //keeps orderer from being pinged on page load when status is already delivered.
  const [originalStatus, setOriginalStatus] = useState(
    props.order.current_status
  );

  const webhookMessage = async (webhookURL, message) => {
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

  console.log("Formatted Date", date);

  const STATUS_CHOICES = {
    ordered: "ordered",
    inProgress: "in progress",
    done: "done",
    delivered: "delivered",
    archived: "archived",
  };

  //Add checks so Crafter doesn't get overwritten
  useEffect(() => {
    const updateOrder = async () => {
      console.log("Status", status);
      const orderRef = doc(database, "orders", props.order.id);
      await updateDoc(orderRef, {
        current_status: status,
      });
    };

    const pingOrderer = async () => {
      if (status === "delivered" && originalStatus !== "delivered") {
        const webhookURL = String(process.env.REACT_APP_WEBHOOK_URL);
        //console.log("WEBHOOK URL",webhookURL)
        //console.log("ORDERER DISCORD",props.order.orderer);
        const message = `<@${props.order.orderer_discord}> an order has been delivered`;
        //console.log("MESSAGE",message)
        webhookMessage(webhookURL, String(message));
      }
    };

    updateOrder();
    pingOrderer();
    setOriginalStatus(status);
  }, [status, originalStatus, props]);

  //Change to UseEffect
  /*     const handleStatusChange = async (event) => {
      console.log("ID", props.order.id)
      const orderRef = doc(database, "orders", props.order.id);
      console.log("ORDERREF:",orderRef);
      await updateDoc(orderRef,{
        current_status:event
      });
      console.log("Changed!", event);
    } */

  return (
    <div>
      <h2>Order Detail</h2>
      {props.order ? (
        <div>
          <p>
            <strong>Requestor:</strong> {props.order.orderer}
          </p>
          <p>
            <strong>order date: </strong>
            {date}
          </p>
          <p>
            <strong>Crafter: </strong>
            {props.order.crafter}
          </p>
          <p>
            <strong>Current status: {status}</strong>
          </p>

          <label htmlFor="statusDropdown"> Change Status:</label>
          <select
            id="statusDropdown"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              //handleStatusChange(e.target.value)
            }}
          >
            {Object.keys(STATUS_CHOICES).map((key) => (
              <option key={key} value={key}>
                {STATUS_CHOICES[key]}
              </option>
            ))}
          </select>

          <div className="details-container">
            <strong>Details:</strong>
            <div className="scrollable-details">{props.order.details}</div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetail;
