'use client';

import dynamic from 'next/dynamic';
import css from './Filter.module.css';

type FiltersState = {
  language: string | null;
  level: string | null;
  price: number | null;
};

const FilterSelect = dynamic(() => import('../FilterSelect/FilterSelect'), {
  ssr: false,
});

const languages = [
  { value: 'english', label: 'English' },
  { value: 'german', label: 'German' },
  { value: 'french', label: 'French' },
  { value: 'ukrainian', label: 'Ukrainian' },
  { value: 'polish', label: 'Polish' },
];

const levels = [
  { value: 'a1', label: 'A1 Beginner' },
  { value: 'a2', label: 'A2 Elementary' },
  { value: 'b1', label: 'B1 Intermediate' },
  { value: 'b2', label: 'B2 Upper-Intermediate' },
];

const prices = [
  { value: 10, label: '10 $' },
  { value: 20, label: '20 $' },
  { value: 30, label: '30 $' },
  { value: 40, label: '40 $' },
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
