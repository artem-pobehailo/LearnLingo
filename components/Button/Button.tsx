import clsx from 'clsx';
import css from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function Button({
  variant,
  text,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(css.button, variant && css[variant])}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
