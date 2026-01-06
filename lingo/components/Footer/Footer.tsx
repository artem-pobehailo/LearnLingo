import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <ul className={css.footerList}>
        <li className={css.footerItem}>
          <h3 className={css.footerTitle}>32,000 +</h3>
          <p className={css.footerText}>Experienced tutors</p>
        </li>
        <li className={css.footerItem}>
          <h3 className={css.footerTitle}>300,000 +</h3>
          <p className={css.footerText}>5-star tutor reviews</p>
        </li>
        <li className={css.footerItem}>
          <h3 className={css.footerTitle}>120 +</h3>
          <p className={css.footerText}>Subjects taught</p>
        </li>
        <li className={css.footerItem}>
          <h3 className={css.footerTitle}>200 +</h3>
          <p className={css.footerText}>Tutor nationalities</p>
        </li>
      </ul>
    </footer>
  );
}
