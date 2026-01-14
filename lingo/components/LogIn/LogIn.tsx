import { useState } from 'react';
import Button from '../Button/Button';
import css from './LogIn.module.css';

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (formData: FormData) => {
    const password = formData.get('password')?.toString().trim();
    const email = formData.get('email')?.toString().trim();

    if (!password || password.length < 2) {
      alert('Enter valid password');
      return;
    }

    if (!email || !email.includes('@')) {
      alert('Enter valid email');
      return;
    }

    console.log(password, email);
  };
  return (
    <div className={css.logIn}>
      <h2 className={css.titel}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form action={handleSubmit} className={css.form}>
        <label className={css.label}>
          <input
            className={css.inputl}
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </label>

        <label className={`${css.label} ${css.labelBut}`}>
          <div className={css.passwordWrapper}>
            <input
              className={css.inputl}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
            />

            <button
              type="button"
              className={css.eyeButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label="Toggle password visibility"
            >
              <svg className={css.iconShow} width={20} height={20}>
                <use href={'/sprite.svg#icon-eye-off'} />
              </svg>
            </button>
          </div>
        </label>

        <Button type="submit" variant="primary" text="Log In" />
      </form>
    </div>
  );
}
