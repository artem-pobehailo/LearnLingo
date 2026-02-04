'use client';
import Filters from '@/components/Filter/Filter';
import TeachersCard from '@/components/TeachersCard/TeachersCard';
import { useEffect, useState } from 'react';
import css from './page.module.css';
import Button from '@/components/Button/Button';
import { getTeachers } from '@/lib/clientApi';
import { Teacher } from '@/types/user';

const TEACHERS_PER_PAGE = 4;

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);

  const visibleTeachers = teachers.slice(0, visibleCount);
  const hasMore = visibleCount < teachers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + TEACHERS_PER_PAGE);
  };

  return (
    <div className={css.teacherSection}>
      <div className={css.filtersCard}>
        <Filters />
      </div>
      <div className={css.teachersList}>
        {visibleTeachers.map((teacher) => (
          <TeachersCard key={teacher.id} teacher={teacher} />
        ))}

        {hasMore && (
          <div className={css.buttonCard}>
            <Button
              variant="primary"
              text="Load more"
              onClick={handleLoadMore}
            />
          </div>
        )}
      </div>
    </div>
  );
}
