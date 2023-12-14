
import { addDoc,collection,deleteDoc,doc,getDocs,onSnapshot,orderBy,query,setDoc,where } from "firebase/firestore";
import { database } from "../Firebase";


const ORDER_COLLECTION = 'orders';

export function addOrder(uid,crafter,details,order_date,orderer,oderer_discord,status){

    addDoc(collection(database,ORDER_COLLECTION),{uid,crafter,details,order_date,orderer,oderer_discord,status});
}

export async function getOrders(uid){
    const orders = query(collection(database,ORDER_COLLECTION),orderBy("order_date","asc"));
    const querySnapshot = await getDocs(orders);
    console.log("ORDERS TRASH", orders, querySnapshot);
    let allOrders = [];
    for( const documentSnapshot of querySnapshot.docs){
        const order =  documentSnapshot.data();
        await allOrders.push({
            ...order,
            date:order['order_date'].toDate(),
            id:documentSnapshot.id,
        })
    }

    console.log("ORDERS",allOrders);
    
    return allOrders;
}
