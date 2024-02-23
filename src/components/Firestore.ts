import {
  collection,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { database } from "../Firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  User,
  browserLocalPersistence,
} from "firebase/auth";
import { UUID } from "crypto";

const ORDER_COLLECTION = "orders";
const USER_COLLECTION = "users";

export interface Order {
  date: string | number | Date;
  id: string;
  crafter: string;
  current_status: string;
  details: string;
  order_date: Timestamp;
  orderer: string;
  oderer_discord: string;
}

export interface Crafter {
  active: boolean;
  auth_id: string;
  created: Timestamp;
  discord_id: string;
  discord_name: string;
  registrationID: UUID;
  role: string;
}

/* export function addOrder(
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
} */

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

      return true;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Function gets the user associated with the auth user
export async function getUser(auth_id: string) {
  const userQuery = query(
    collection(database, USER_COLLECTION),
    where("auth_id", "==", auth_id)
  ); //was getDocs, trying getDoc to get a singular object
  try {
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userData = userSnapshot.docs[0].data();

      return userData;
    } else {
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
  const allOrders = [];
  for (const documentSnapshot of querySnapshot.docs) {
    const order = documentSnapshot.data() as Order;

    await allOrders.push({
      ...order,
      date: order["order_date"].toDate(),
      id: documentSnapshot.id,
    });
  }

  return allOrders;
}

export const loginUser = (email: string, password: string) => {
  const auth = getAuth();
  // changed from session storage to allow opening of new tabs without resigining in.
  setPersistence(auth, browserLocalPersistence);
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
