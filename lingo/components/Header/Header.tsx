'use client';

import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import Link from 'next/link';

export default function Herder() {
  const pathname = usePathname();
  return (
    <header className={css.header}>
      <Link href="/" className={css.logo}>
        <svg className={css.iconlogo} width={28} height={28}>
          <use href="/sprite.svg#icon-ukraine"></use>
        </svg>
        <span className={css.logotext}>LearnLingo</span>
      </Link>

      <nav>
        <ul className={css.navPage}>
          <li>
            <Link href="/" className={pathname === '/' ? css.active : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/teachers"
              className={pathname === '/teachers' ? css.active : ''}
            >
              Teachers
            </Link>
          </li>
        </ul>
      </nav>

      <div className={css.headerAuth}>
        <button className={css.headerLogin}>
          <svg className={css.iconlogo} width={20} height={20}>
            <use href="/sprite.svg#icon-log"></use>
          </svg>
          Log in
        </button>
        <button className={css.headerRegistr}>Registration</button>
      </div>
    </header>
  );
}
