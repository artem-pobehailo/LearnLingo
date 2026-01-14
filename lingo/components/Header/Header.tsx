'use client';

import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import Link from 'next/link';
import { useState } from 'react';

import Modal from '../Modal/Modal';
import LogIn from '../LogIn/LogIn';
import Registration from '../Registration/Registration';

export default function Header() {
  type ModalType = 'login' | 'registration' | null;
  const [modalType, setModalType] = useState<ModalType>(null);

  const openLogin = () => setModalType('login');
  const openRegistration = () => setModalType('registration');
  const closeModal = () => setModalType(null);

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
        <button className={css.headerLogin} onClick={openLogin}>
          <svg className={css.iconlogo} width={20} height={20}>
            <use href="/sprite.svg#icon-log"></use>
          </svg>
          Log in
        </button>

        <button className={css.headerRegistr} onClick={openRegistration}>
          Registration
        </button>
        {modalType === 'login' && (
          <Modal onClose={closeModal}>
            <LogIn />
          </Modal>
        )}
        {modalType === 'registration' && (
          <Modal onClose={closeModal}>
            <Registration />
          </Modal>
        )}
      </div>
    </header>
  );
}
