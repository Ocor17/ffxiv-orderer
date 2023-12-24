
import { addDoc,collection,deleteDoc,doc,getDocs,getDoc,onSnapshot,orderBy,query,setDoc,where } from "firebase/firestore";
import { database } from "../Firebase";


const ORDER_COLLECTION = 'orders';
const USER_COLLECTION = 'users';
export function addOrder(uid,crafter,details,order_date,orderer,oderer_discord,status){

    addDoc(collection(database,ORDER_COLLECTION),{uid,crafter,details,order_date,orderer,oderer_discord,status});
}

export function addUser(auth_id,discord){
    addDoc(collection(database,USER_COLLECTION),{active:false,auth_id,discord});

}

export async function getUser(auth_id){
    const userQuery = query(collection(database, USER_COLLECTION), where("auth_id", "==", auth_id));    //was getDocs, trying getDoc to get a singular object
    try {
        const userSnapshot = await getDocs(userQuery);
    
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          //console.log("USER", userData);
          return userData;
        } else {
          console.log("User not found");
          return null;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; // Rethrow the error to handle it at the calling site if necessary
      }
}

export async function getOrders(uid){
    const orders = query(collection(database,ORDER_COLLECTION),orderBy("order_date","asc"));
    const querySnapshot = await getDocs(orders);
    //console.log("ORDERS TRASH", orders, querySnapshot);
    let allOrders = [];
    for( const documentSnapshot of querySnapshot.docs){
        const order =  documentSnapshot.data();
        await allOrders.push({
            ...order,
            date:order['order_date'].toDate(),
            id:documentSnapshot.id,
        })
    }

    //console.log("ORDERS",allOrders);
    
    return allOrders;
}
