'use client';

import { useEffect, useState } from 'react';
import { getTeachers } from '@/lib/clientApi';
import { Teacher } from '@/types/user';
import TeachersCard from '@/components/TeachersCard/TeachersCard';
import { getFavorites } from '@/lib/Firebase/favorites';

import Loader from '@/components/Loader/Loader';
import css from '../teachers/page.module.css';
import { useAuth } from '@/components/utils/auth';
import Button from '@/components/Button/Button';

export default function FavouritesPage() {
  const { user, loading: authUser } = useAuth();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  const TEACHERS_PER_PAGE = 4;
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);
  const [loadingMore, setLoadingMore] = useState(false);
  const visibleTeachers = teachers.slice(0, visibleCount);
  const hasMore = visibleCount < teachers.length;
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + TEACHERS_PER_PAGE);
      setLoadingMore(false);
    }, 500);
  };

  useEffect(() => {
    if (authUser) return;

    async function load() {
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
  }, [user, authUser]);

  useEffect(() => {
    setVisibleCount(TEACHERS_PER_PAGE);
  }, [teachers]);

  if (loading) return <Loader />;

  return (
    <div className={css.teacherSection}>
      <div className={css.teachersList}>
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((teacher) => (
            <TeachersCard
              key={teacher.id}
              teacher={teacher}
              onUnfavorite={() =>
                setTeachers((prev) => prev.filter((t) => t.id !== teacher.id))
              }
            />
          ))
        ) : (
          <p className={css.emptyText}>No favourite teachers yet</p>
        )}{' '}
      </div>

      {hasMore && (
        <div className={css.buttonCard}>
          <Button
            variant="primary"
            text={loadingMore ? 'Loading...' : 'Load more'}
            onClick={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
}
