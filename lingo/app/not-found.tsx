import styles from './NotFound.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.box}>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page not found</h2>
        <p className={styles.text}>
          This page does not appear to exist or has existed moved.
        </p>

        <a href="/" className={styles.button}>
          Home
        </a>
      </div>
    </div>
  );
}
