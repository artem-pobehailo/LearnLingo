'use client';

import dynamic from 'next/dynamic';
import css from './Filter.module.css';

type Props = {
  languages: string[];
  levels: string[];
  prices: number[];
  onLanguageChange: (value: string | null) => void;
  onLevelChange: (value: string | null) => void;
  onPriceChange: (value: number | null) => void;
};

const FilterSelect = dynamic(() => import('../FilterSelect/FilterSelect'), {
  ssr: false,
});

// const languages = [
//   { value: 'English', label: 'English' },
//   { value: 'German', label: 'German' },
//   { value: 'French', label: 'French' },
//   { value: 'Ukrainian', label: 'Ukrainian' },
//   { value: 'Polish', label: 'Polish' },
// ];

// const levels = [
//   { value: 'A1', label: 'A1 Beginner' },
//   { value: 'A2', label: 'A2 Elementary' },
//   { value: 'B1', label: 'B1 Intermediate' },
//   { value: 'B2', label: 'B2 Upper-Intermediate' },
// ];

// const prices = [
//   { value: 10, label: '10 $' },
//   { value: 20, label: '20 $' },
//   { value: 30, label: '30 $' },
//   { value: 40, label: '40 $' },
// ];

export default function Filters({
  languages,
  levels,
  prices,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}: Props) {
  const languageOptions = languages.map((lang) => ({
    value: lang,
    label: lang,
  }));

  const levelOptions = levels.map((level) => ({
    value: level,
    label: level,
  }));

  const priceOptions = prices.map((price) => ({
    value: price,
    label: `${price} $`,
  }));

  return (
    <div className={css.filters}>
      <FilterSelect
        label="Languages"
        options={languageOptions}
        placeholder="Select language"
        onChange={(option) => onLanguageChange(option?.value ?? null)}
      />
      <FilterSelect
        label="Level"
        options={levelOptions}
        placeholder="Select level"
        onChange={(option) => onLevelChange(option?.value ?? null)}
      />
      <FilterSelect
        label="Price"
        options={priceOptions}
        placeholder="Select price"
        onChange={(option) => onPriceChange(option?.value ?? null)}
      />
    </div>
  );
}
