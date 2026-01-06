import Link from 'next/link';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className={css.hero}>
        <h1 className={css.heroTitel}>
          Unlock your potential with the best{' '}
          <span className={css.heroTitelSpan}>language</span> tutors
        </h1>
        <p className={css.heroText}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <Link href="/teachers" className={css.heroButton}>
          Get started
        </Link>
      </div>
      <div className={css.heroImage} aria-hidden="true"></div>
    </section>
  );
}
