import { Teacher } from '@/types/user';

import { db } from './Firebase/Firebase';
import { ref, get } from 'firebase/database';

export const getTeachers = async (): Promise<Teacher[]> => {
  const snapshot = await get(ref(db, 'teachers'));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...(teacher as Omit<Teacher, 'id'>),
  }));
};
