import {
  collection,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  documentId,
  getFirestore,
  addDoc,
  updateDoc,
} from "firebase/firestore/lite";

import { app } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const db = getFirestore(app);
let authUid; // Declare authUid outside the event listener
onAuthStateChanged(getAuth(app), (user) => {
  if (user) {
    authUid = user.uid;
  }
});

const vansCollectionRef = collection(db, "vans");

export async function getVans() {
  const snapshot = await getDocs(vansCollectionRef);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getVan(id) {
  const docRef = doc(db, "vans", id);
  const snapshot = await getDoc(docRef);
  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
}

export async function getHostVans() {
  if (authUid) {
    const q = query(vansCollectionRef, where("hostId", "==", authUid));
    const snapshot = await getDocs(q).catch((error) => {
      console.log(error);
    });
    const vans = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return vans;
  }
}

export async function getHostVan(id) {
  if (authUid) {
    const q = query(
      vansCollectionRef,
      where(documentId(), "==", id),
      where("hostId", "==", authUid)
    );
    const snapshot = await getDocs(q);
    const vans = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return vans[0];
  }
}

export async function addVan(van) {
  try {
    const docRef = await addDoc(vansCollectionRef, { ...van });
    console.log("Van added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding van: ", error);
  }
}

export async function addReview(review) {
  const reviewsCollectionRef = collection(db, "reviews");

  try {
    const docRef = await addDoc(reviewsCollectionRef, { ...review });
    console.log("review added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding review: ", error);
  }
}

export async function rentVan(vanId, hostId, startDate, endDate) {
  const vanDocRef = doc(db, "vans", vanId);
  const vanSnapshot = await getDoc(vanDocRef);

  if (!vanSnapshot.exists()) {
    throw new Error("Van does not exist");
  }

  const rentalsCollectionRef = collection(db, "rentals");

  const startOverlappingRentalsQuery = query(
    rentalsCollectionRef,
    where("vanId", "==", vanId),
    where("startDate", "<=", startDate)
  );

  const startOverlappingRentalsSnapshot = await getDocs(
    startOverlappingRentalsQuery
  );

  const endOverlappingRentalsQuery = query(
    rentalsCollectionRef,
    where("vanId", "==", vanId),
    where("endDate", ">=", endDate)
  );

  const endOverlappingRentalsSnapshot = await getDocs(
    endOverlappingRentalsQuery
  );

  console.log(startOverlappingRentalsSnapshot, endOverlappingRentalsSnapshot);

  if (
    !endOverlappingRentalsSnapshot.empty &&
    !startOverlappingRentalsSnapshot.empty
  ) {
    throw new Error("Van is already rented during the requested period");
  }

  await updateDoc(vanDocRef, {
    isRented: true,
  });

  await addDoc(rentalsCollectionRef, {
    vanId,
    hostId,
    startDate,
    endDate,
  });

  console.log("Rental successful!");
}
