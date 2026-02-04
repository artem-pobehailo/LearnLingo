import { useState } from 'react';
import Button from '../Button/Button';
import css from './Registration.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationSchema } from '@/lib/validation/shema';
import { registerUser } from '@/lib/Firebase/FirebaseAuth';
import { User } from '@/types/user';
type RegistrationFormValues = {
  email: string;
  password: string;
  name: string;
};

type Props = {
  onClose: () => void;
};

export default function Registration({ onClose }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    try {
      await registerUser(data.email, data.password, data.name);

      onClose();
    } catch (error: any) {
      alert(error.message);
    }
  };
  //  } catch (error: unknown) {
  //     if (error instanceof error) {
  //       toast.error(error.message)
  //     }
  //     else
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <div className={css.registration}>
      <h2 className={css.titel}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.label}>
          <input
            className={css.inputl}
            type="text"
            placeholder="Name"
            {...register('name')}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </label>

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
          text={isSubmitting ? 'Loading...' : 'Sign Up'}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
