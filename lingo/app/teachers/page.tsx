'use client';
import Filters from '@/components/Filter/Filter';
import TeachersCard from '@/components/TeachersCard/TeachersCard';
import { useState } from 'react';
import css from './page.module.css';
import Button from '@/components/Button/Button';

const Teachers = [
  { id: '1', name: 'Jane Smith' },
  { id: '2', name: 'John Doe' },
  { id: '3', name: 'Alice Johnson' },
  { id: '4', name: 'Mark Brown' },
];
const TEACHERS_PER_PAGE = 2;

export default function TeachersPage() {
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  const visibleTeachers = Teachers.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + TEACHERS_PER_PAGE);
  };

  const hasMore = visibleCount < Teachers.length;

  return (
    <div className={css.teacherSection}>
      <div className={css.filtersCard}>
        <Filters />
      </div>
      <div className={css.teachersList}>
        {visibleTeachers.map((teacher) => (
          <TeachersCard key={teacher.id} />
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
