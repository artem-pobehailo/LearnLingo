'use client';

import { useEffect, useState } from 'react';
import { getTeachers } from '@/lib/clientApi';
import { Teacher } from '@/types/user';
import TeachersCard from '@/components/TeachersCard/TeachersCard';
import { getFavorites } from '@/lib/Firebase/favorites';
import { getCurrentUser } from '@/lib/Firebase/FirebaseAuth';
import Loader from '@/components/Loader/Loader';

export default function FavouritesPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const user = getCurrentUser();
      if (!user) {
        setTeachers([]);
        setLoading(false);
        return;
      }

      const [allTeachers, favIds] = await Promise.all([
        getTeachers(),
        getFavorites(user.uid),
      ]);

      const favTeachers = allTeachers.filter((t) =>
        favIds.includes(String(t.id)),
      );

      setTeachers(favTeachers);
      setLoading(false);
    }

    load();
  }, []);

  if (loading) return <Loader />;
  if (!teachers.length) return <p>No favourite teachers yet</p>;

  return (
    <div>
      {teachers.map((teacher) => (
        <TeachersCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
