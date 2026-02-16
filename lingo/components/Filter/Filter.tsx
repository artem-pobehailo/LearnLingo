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
