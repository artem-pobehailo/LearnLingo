import { useState } from 'react';
import Button from '../Button/Button';
import css from './LogIn.module.css';
import { loginUser } from '@/lib/Firebase/FirebaseAuth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@/lib/validation/shema';
import { User } from '@/types/user';

type LoginFormValues = {
  email: string;
  password: string;
};
type Props = {
  onClose: () => void;
};

export default function LogIn({ onClose }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const user = await loginUser(data.email, data.password);
      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className={css.logIn}>
      <h2 className={css.titel}>Log In</h2>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.label}>
          <input
            className={css.inputl}
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </label>

        <label className={`${css.label} ${css.labelBut}`}>
          <div className={css.passwordWrapper}>
            <input
              className={css.inputl}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              {...register('password')}
            />
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}

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

        <Button
          type="submit"
          variant="primary"
          text={isSubmitting ? 'Loading...' : 'Log In'}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
