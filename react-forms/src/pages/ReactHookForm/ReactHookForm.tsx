import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './ReactHookForm.module.scss';
import { useState } from 'react';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';

const schema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .matches(/^[a-zA-Z]+$/, 'Age should not contain special characters or numbers'),
  age: yup
    .number()
    .required()
    .typeError('Age must be an integer')
    .integer()
    .positive('Age must be a positive number'),
  email: yup
    .string()
    .trim()
    .required('Email is required')
    .email('Enter a valid email (e.g., user@example.com)')
    .matches(/^.+@.+\..+$/, 'Email address must contain a domain name'),
  password: yup
    .string()
    .trim()
    .test(
      'digit',
      'Must include at least one digit (0-9)',
      (value) => value !== undefined && /[0-9]/.test(value)
    )
    .test(
      'uppercase',
      'Must include at least one uppercase letter (A-Z)',
      (value) => value !== undefined && /[A-Z]/.test(value)
    )
    .test(
      'lowercase',
      'Must include at least one lowercase letter (a-z)',
      (value) => value !== undefined && /[a-z]/.test(value)
    )

    .test(
      'specialCharacters',
      'Must include at least one special character (!@#$%^&*)',
      (value) => value !== undefined && /[!@#$%^&*]/.test(value)
    )
    .required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), undefined], 'Passwords must match'),
  sex: yup.string().required(),
});

type FormData = yup.InferType<typeof schema>;

const ReactHookForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const options = ['female', 'male'];

  const handleTogglePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleToggleConfirmPassword = () => {
    setIsConfirmPasswordShown(!isConfirmPasswordShown);
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <>
      <h1 className={styles.header}>React Hook Form</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.row}>
          <label>Name *</label>
          <input {...register('name')} />
          <span className={styles.error}>{errors.name?.message}</span>
        </div>

        <div className={styles.row}>
          <label>Age *</label>
          <input {...register('age')} />
          <span className={styles.error}>{errors.age?.message}</span>
        </div>

        <div className={styles.row}>
          <label>Email *</label>
          <input {...register('email')} />
          <span className={styles.error}>{errors.email?.message}</span>
        </div>

        <div className={`${styles.row} ${styles.passwordRow}`}>
          <div className={styles.passwordsContainer}>
            <div className={styles.password}>
              <label>Password *</label>
              <div className={styles.passwordInputWrapper}>
                <input
                  className={styles.passwordInput}
                  type={isPasswordShown ? 'text' : 'password'}
                  {...register('password')}
                />
                <div
                  className={isPasswordShown ? `${styles.showPassword}` : `${styles.hidePassword}`}
                  onClick={handleTogglePassword}
                ></div>
              </div>
              <span className={styles.error}>{errors.password?.message}</span>
              <PasswordStrength password={watch('password')} />
            </div>
            <div className={styles.password}>
              <label>Confirm password *</label>
              <div className={styles.passwordInputWrapper}>
                <input
                  className={styles.passwordInput}
                  type={isConfirmPasswordShown ? 'text' : 'password'}
                  {...register('confirmPassword')}
                />
                <div
                  className={
                    isConfirmPasswordShown ? `${styles.showPassword}` : `${styles.hidePassword}`
                  }
                  onClick={handleToggleConfirmPassword}
                ></div>
              </div>
              <span className={styles.error}>{errors.confirmPassword?.message}</span>
            </div>
          </div>
        </div>

        <div className={styles.row}>
          <label>What is your gender *</label>
          <select {...register('sex')}>
            {options.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <input className={styles.submitButton} type="submit" />
      </form>
    </>
  );
};

export default ReactHookForm;
