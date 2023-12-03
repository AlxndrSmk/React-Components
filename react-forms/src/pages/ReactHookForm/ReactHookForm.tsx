import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './ReactHookForm.module.scss';
import { useState } from 'react';
import PasswordStrength from '../../components/PasswordStrength/PasswordStrength';
import { convertImageToBase64 } from '../../utils/heplers/convertImageToBase64';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { setFormData } from '../../store/reducers/formSlice';
import { SubmitForm } from '../../types/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ControlledAutocomplete from '../../components/ControlledAutocomplete/ControlledAutocomplete';
import { schema } from '../../validation/validationSchema';

type FormData = yup.InferType<typeof schema>;

const ReactHookForm = () => {
  const [countriesFilteredVisible, setCountriesFilteredVisible] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const availableData = useAppSelector((store) => store.userForms);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
    setValue,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (data.image instanceof File) {
      const image64 = await convertImageToBase64(data.image);
      const dataForSubmit: SubmitForm = { ...data, image: image64 };
      const newFormsData: SubmitForm[] = [dataForSubmit, ...availableData];
      dispatch(setFormData(newFormsData));

      navigate('/');
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const image = event.target.files[0];
      setValue('image', image);
      trigger('image');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <Link to="/">Back to main page</Link>
      <h1 className={styles.header}>React Hook Form</h1>
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
      <div className={`${styles.inlineRow}`}>
        <input type="checkbox" {...register('acceptTerms')} />
        <label htmlFor="acceptTerms">Accept Terms & Conditions *</label>
        <span className={styles.error}>{errors.acceptTerms?.message}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="image">Upload image: * </label>
        <div>
          <input
            type="file"
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
          <span className={styles.error}>{errors.image?.message}</span>
        </div>
      </div>
      <div className={styles.row}>
        <ControlledAutocomplete
          countriesFilteredVisible={countriesFilteredVisible}
          setCountriesFilteredVisible={setCountriesFilteredVisible}
          register={register}
          watchCountry={watch('country')}
          setValue={setValue}
          error={errors.country?.message}
          trigger={trigger}
        />
      </div>
      <input className={styles.submitButton} type="submit" disabled={!isValid} />
    </form>
  );
};

export default ReactHookForm;
