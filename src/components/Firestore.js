
import { addDoc,collection,deleteDoc,doc,getDocs,getDoc,onSnapshot,orderBy,query,setDoc,where } from "firebase/firestore";
import { database } from "../Firebase";


const ORDER_COLLECTION = 'orders';
const USER_COLLECTION = 'users';
export function addOrder(uid,crafter,details,order_date,orderer,oderer_discord,status){

    addDoc(collection(database,ORDER_COLLECTION),{uid,crafter,details,order_date,orderer,oderer_discord,status});
}

export async function addUser(auth_id,discordCode){

    if(!checkDiscordCode(auth_id,discordCode)){
      console.log("User Not Found");
      return;
    }

    console.log("Adding user")

    const collectionRef = collection(database,USER_COLLECTION);
    const q = query(collectionRef, where("registrationID", "==", discordCode));
    const querySnapshot = await getDocs(q);

    setDoc(querySnapshot.docs[0].ref,{auth_id:auth_id,}, {merge:true});

    //addDoc(collection(database,USER_COLLECTION),{active:false,auth_id,discordCode});

}

//discordCode is the registration code given.
async function checkDiscordCode(auth_id,discordCode){
  const userQuery = query(collection(database, USER_COLLECTION), where("discordCode", "==", discordCode));
  try {
    const userSnapshot = await getDocs(userQuery);
    if(userSnapshot.empty){
      console.log("No user found");
      return false;
    } else {
      console.log("User found");
      //userSnapshot.set({auth_id:auth_id}, {merge:true});
      //console.log("User updated")
      return true;
    }
  } catch (error){
    console.error(error);
    throw error;
  }
  
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
