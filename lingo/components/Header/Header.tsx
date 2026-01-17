'use client';

import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import Modal from '../Modal/Modal';
import LogIn from '../LogIn/LogIn';
import Registration from '../Registration/Registration';
import { User } from '@/types/user';

export default function Header() {
  type ModalType = 'login' | 'registration' | null;
  const [modalType, setModalType] = useState<ModalType>(null);

  const openLogin = () => setModalType('login');
  const openRegistration = () => setModalType('registration');
  const closeModal = () => setModalType(null);

  const [user, setUser] = useState<User>(() => {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  if (!mounted) return null;

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
        {user ? (
          <>
            <span className={css.headerLogin}>
              Hi, {user.name?.length ? user.name : user.email}
            </span>
            <button
              className={css.headerLogOut}
              onClick={() => {
                setUser(null);
                localStorage.removeItem('user');
              }}
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button className={css.headerLogin} onClick={openLogin}>
              <svg className={css.iconlogo} width={20} height={20}>
                <use href="/sprite.svg#icon-log"></use>
              </svg>
              Log in
            </button>
            <button className={css.headerRegistr} onClick={openRegistration}>
              Registration
            </button>
          </>
        )}
      </div>

      {modalType === 'login' && (
        <Modal onClose={closeModal}>
          <LogIn onClose={closeModal} setUser={setUser} />
        </Modal>
      )}
      {modalType === 'registration' && (
        <Modal onClose={closeModal}>
          <Registration onClose={closeModal} setUser={setUser} />
        </Modal>
      )}
    </header>
  );
}
