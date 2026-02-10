'use client';

import css from './ErrorMaeeage.module.css';

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message,
}: ErrorMessageProps) {
  if (!message) return null;

  return <div className={css.errorMessage}>{message}</div>;
}
