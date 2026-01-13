'use client';

import Select, { components, DropdownIndicatorProps } from 'react-select';
import css from './FilterSelect.module.css';

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  placeholder: string;
};

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  const { selectProps } = props;

  const color = selectProps.value ? '#121417' : 'rgba(18, 20, 23, 0.2)';
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="10"
        height="5"
        viewBox="0 0 55 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.571 4.571l22.857 22.857 22.857-22.857"
          stroke={color}
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

export default function FilterSelect({ label, options, placeholder }: Props) {
  return (
    <div className={css.filterLabelWraper}>
      <label className={css.filterLabel}>{label}</label>
      <Select
        options={options}
        placeholder={placeholder}
        isSearchable={false}
        classNamePrefix="filter"
        menuPortalTarget={
          typeof document !== 'undefined' ? document.body : null
        }
        styles={{
          control: (base) => ({
            ...base,
            height: 48,
            minWidth: 124,
            borderRadius: 14,
            fontSize: 18,
            paddingLeft: 18,
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 1000,
          }),
          singleValue: (base) => ({ ...base, color: '#121417' }),
          placeholder: (base) => ({ ...base, color: 'rgba(18, 20, 23, 0.2)' }),

          indicatorSeparator: () => ({ display: 'none' }),
          menu: (base) => ({
            ...base,
            borderRadius: 14,
            marginTop: 4,
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
            maxHeight: '300px',
            overflowY: 'auto',
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f8f8f8' : '#fff',
            color: state.isSelected ? '#121417' : '#8a8a89',
            padding: '12px 18px',
          }),
        }}
      />
    </div>
  );
}
