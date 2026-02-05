import { ref, set, remove, get } from 'firebase/database';
import {db} from "@/lib/Firebase/Firebase"

export const addFavorite = async (uid: string, teacherId: string) => {
  const favRef = ref(db, `users/${uid}/favorites/${teacherId}`);
  await set(favRef, true);
};

export const removeFavorite = async (uid: string, teacherId: string) => {
  const favRef = ref(db, `users/${uid}/favorites/${teacherId}`);
  await remove(favRef);
};

export const getFavorites = async (uid: string): Promise<string[]> => {
  const favRef = ref(db, `users/${uid}/favorites`);
  const snapshot = await get(favRef);

  if (!snapshot.exists()) return [];

  return Object.keys(snapshot.val());
};
