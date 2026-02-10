'use client';
import Filters from '@/components/Filter/Filter';
import TeachersCard from '@/components/TeachersCard/TeachersCard';
import { useEffect, useMemo, useState } from 'react';
import css from './page.module.css';
import Button from '@/components/Button/Button';
import { getTeachers } from '@/lib/clientApi';
import { Teacher } from '@/types/user';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

type FiltersState = {
  language: string | null;
  level: string | null;
  price: number | null;
};
const TEACHERS_PER_PAGE = 4;
export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  const [filters, setFilters] = useState<FiltersState>({
    language: null,
    level: null,
    price: null,
  });

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);

  useEffect(() => {
    setVisibleCount(TEACHERS_PER_PAGE);
  }, [filters]);

  const availableFilters = useMemo(() => {
    const languagesSet = new Set<string>();
    const levelsSet = new Set<string>();
    const pricesSet = new Set<number>();

    teachers.forEach((teacher) => {
      teacher.languages.forEach((lang) => languagesSet.add(lang));

      teacher.levels.forEach((level) => levelsSet.add(level));

      pricesSet.add(teacher.price_per_hour);
    });

    return {
      languages: Array.from(languagesSet),
      levels: Array.from(levelsSet),
      prices: Array.from(pricesSet).sort((a, b) => a - b),
    };
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      if (filters.language && !teacher.languages.includes(filters.language)) {
        return false;
      }

      if (filters.level && !teacher.levels.includes(filters.level)) {
        return false;
      }

      if (filters.price !== null && teacher.price_per_hour !== filters.price) {
        return false;
      }

      return true;
    });
  }, [teachers, filters]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  const hasMore = visibleCount < filteredTeachers.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + TEACHERS_PER_PAGE);
  };

  return (
    <div className={css.teacherSection}>
      <div className={css.filtersCard}>
        <Filters
          languages={availableFilters.languages}
          levels={availableFilters.levels}
          prices={availableFilters.prices}
          onLanguageChange={(language) =>
            setFilters((prev) => ({ ...prev, language }))
          }
          onLevelChange={(level) => setFilters((prev) => ({ ...prev, level }))}
          onPriceChange={(price) => setFilters((prev) => ({ ...prev, price }))}
        />
      </div>
      <div className={css.teachersList}>
        {visibleTeachers.length > 0 ? (
          visibleTeachers.map((teacher) => (
            <TeachersCard key={teacher.id} teacher={teacher} />
          ))
        ) : (
          <ErrorMessage message="No teachers found for selected filters." />
        )}

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
