'use client';

import dynamic from 'next/dynamic';
import css from './Filter.module.css';

const FilterSelect = dynamic(() => import('../FilterSelect/FilterSelect'), {
  ssr: false,
});

const languages = [
  { value: 'english', label: 'English' },
  { value: 'german', label: 'German' },
  { value: 'french', label: 'French' },
  { value: 'french', label: 'French' },
  { value: 'french', label: 'French' },
];

const levels = [
  { value: 'a1', label: 'A1 Beginner' },
  { value: 'a2', label: 'A2 Elementary' },
  { value: 'b1', label: 'B1 Intermediate' },
];

const prices = [
  { value: 10, label: '10 $' },
  { value: 20, label: '20 $' },
  { value: 30, label: '30 $' },
];

export default function Filters() {
  return (
    <div className={css.filters}>
      <FilterSelect
        label="Languages"
        options={languages}
        placeholder="Select language"
      />
      <FilterSelect label="Level" options={levels} placeholder="Select level" />
      <FilterSelect label="Price" options={prices} placeholder="Select price" />
    </div>
  );
}
