import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { database } from "../Firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserSessionPersistence,
  User,
} from "firebase/auth";
import { UUID } from "crypto";

const ORDER_COLLECTION = "orders";
const USER_COLLECTION = "users";
export function addOrder(
  uid: UUID,
  crafter: string,
  details: string,
  order_date: unknown,
  orderer: string,
  oderer_discord: string,
  status: string
) {
  addDoc(collection(database, ORDER_COLLECTION), {
    uid,
    crafter,
    details,
    order_date,
    orderer,
    oderer_discord,
    status,
  });
}

export async function addUser(auth_id: string, discordCode: string) {
  if (!checkDiscordCode(discordCode)) {
    console.log("User Not Found");
    return;
  }

  console.log("Adding user");

  const collectionRef = collection(database, USER_COLLECTION);
  const q = query(collectionRef, where("registrationID", "==", discordCode));
  const querySnapshot = await getDocs(q);

  setDoc(querySnapshot.docs[0].ref, { auth_id: auth_id }, { merge: true });

  //addDoc(collection(database,USER_COLLECTION),{active:false,auth_id,discordCode});
}

//discordCode is the registration code given.
export async function checkDiscordCode(discordCode: string) {
  const userQuery = query(
    collection(database, USER_COLLECTION),
    where("discordCode", "==", discordCode)
  );
  try {
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      console.log("No user found");
      return false;
    } else {
      console.log("User found");
      //userSnapshot.set({auth_id:auth_id}, {merge:true});
      //console.log("User updated")
      return true;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUser(auth_id: unknown) {
  //console.log("Getting user---------------------------");
  const userQuery = query(
    collection(database, USER_COLLECTION),
    where("auth_id", "==", auth_id)
  ); //was getDocs, trying getDoc to get a singular object
  try {
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();
      //console.log("USER", userData);
      //console.log("FOUND USER");
      return userData;
    } else {
      //console.log("User not found");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error; // Rethrow the error to handle it at the calling site if necessary
  }
}

export async function getOrders() {
  const orders = query(
    collection(database, ORDER_COLLECTION),
    orderBy("order_date", "asc")
  );
  const querySnapshot = await getDocs(orders);
  //console.log("ORDERS TRASH", orders, querySnapshot);
  const allOrders = [];
  for (const documentSnapshot of querySnapshot.docs) {
    const order = documentSnapshot.data();
    await allOrders.push({
      ...order,
      date: order["order_date"].toDate(),
      id: documentSnapshot.id,
    });
  }

  //console.log("ORDERS",allOrders);

  return allOrders;
}

export const loginUser = (email: string, password: string) => {
  const auth = getAuth();
  setPersistence(auth, browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerUser = (
  email: string,
  password: string,
  confirm_password: string
) => {
  if (password !== confirm_password) {
    alert("Passwords do not match");
    return;
  }
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password);
};

export const startAuthListener = (callback: (arg0: User | null) => void) => {
  return onAuthStateChanged(getAuth(), (user) => {
    callback(user);
  });
};

export const getUserAuth = () => {
  const auth = getAuth();
  return auth.currentUser;
};

export const logoutUser = () => {
  const auth = getAuth();
  return auth.signOut();
};

export const getUserAuthExists = () => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(
      auth,
      (user) => {
        resolve(user !== null);
      },
      reject
    );
  });
};
