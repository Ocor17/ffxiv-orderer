import React, {useState} from "react";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../Firebase";

const OrderDetail = (props) =>{


  //console.log(props.order)

  const date = new Date(props.order.date).toDateString();
  const [status, setStatus] = useState(props.order.current_status); 

  console.log("Formatted Date",date);

  const STATUS_CHOICES = {
    ordered:"ordered",
    inProgress:"in progress",
    done:"done",
    delivered:"delivered",
    archived:"archived",
  };

    //Change to UseEffect
    const handleStatusChange = async (event) => {
      console.log("ID", props.order.id)
      const orderRef = doc(database, "orders", props.order.id);
      console.log("ORDERREF:",orderRef);
      await updateDoc(orderRef,{
        current_status:event
      });
      console.log("Changed!", event);
    }
  
    return (
      <div>
        <h2>Order Detail</h2>
        {props.order ? (
          <div>
            <p>
              <strong>Request:</strong> {props.order.orderer}
            </p>
            <p>
              <strong>order date: </strong>{date}
            </p>
            <p>
              <strong>Requestor: </strong>{props.order.crafter}
            </p>
            <p>
              <strong>Current status:</strong> 
            </p>

          <label htmlFor="statusDropdown"> Change Status:</label>
          <select
            id="statusDropdown"
            value={status}
            onChange={
              (e) => {
                setStatus(e.target.value)
                handleStatusChange(e.target.value)
              }}
          >
            {Object.keys(STATUS_CHOICES).map((key) => (
              <option key={key} value={key}>
                {STATUS_CHOICES[key]}
              </option>
            ))}
          </select>
            
          <div className='details-container'>
            <strong>Details:</strong>
            <div className="scrollable-details"> 
            {props.order.details}
            </div>
          </div>
        </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };

export default OrderDetail;