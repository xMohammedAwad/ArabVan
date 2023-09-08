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
  Timestamp,
} from "firebase/firestore/lite";

import { app } from "./firebase";

export const db = getFirestore(app);

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
  const q = query(vansCollectionRef, where("hostId", "==", "123"));
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans;
}

export async function getHostVan(id) {
  const q = query(
    vansCollectionRef,
    where(documentId(), "==", id),
    where("hostId", "==", "123")
  );
  const snapshot = await getDocs(q);
  const vans = snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return vans[0];
}

export async function rentVan(vanId, userId, startDate, endDate) {
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
    userId,
    startDate,
    endDate,
  });

  console.log("Rental successful!");
}
