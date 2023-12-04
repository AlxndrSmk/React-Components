import { useRef, useState } from 'react';
import styles from '../ReactHookForm/ReactHookForm.module.scss';
import { SubmitUncontrolledForm } from '../../types/types';
import { ValidationError } from 'yup';
import { convertImageToBase64 } from '../../utils/heplers/convertImageToBase64';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setFormData } from '../../store/reducers/formSlice';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import UncontrolledAutocomplete from '../../components/UncontrolledAutocomplete/UncontrolledAutocomplete';
import { schema } from '../../validation/validationSchema';

const UncontrolledForm: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<SubmitUncontrolledForm>({});
  const [imageFile, setImageFile] = useState<File>();
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);

  const availableData = useAppSelector((store) => store.form.userForms);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const maleRef = useRef<HTMLInputElement>(null);
  const femaleRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);

  const validateData = async (data: SubmitUncontrolledForm) => {
    try {
      await schema.validateSync(data, { abortEarly: false });
      return true;
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (typeof err.path === 'string') {
            errors[err.path] = err.message;
          }
        });
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
          return false;
        }
      }
    }
  };

  const handleTogglePassword = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const handleToggleConfirmPassword = () => {
    setIsConfirmPasswordShown(!isConfirmPasswordShown);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] instanceof File) {
      const image = event.target.files[0];
      setImageFile(image);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData: SubmitUncontrolledForm = {
      confirmPassword: confirmPasswordRef.current?.value,
      acceptTerms: acceptRef.current?.checked,
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value),
      sex: maleRef.current?.checked ? 'male' : femaleRef.current?.checked ? 'female' : undefined,
      country: countryRef.current?.value,
      image: imageFile,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
    };

    const isValid = await validateData(formData);

    if (isValid && formData.image) {
      const image64 = await convertImageToBase64(formData.image);
      const dataForSubmit = { ...formData, image: image64 };
      const newFormsData = [dataForSubmit, ...availableData];
      dispatch(setFormData(newFormsData));
      navigate('/');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Link to="/">Back to main page</Link>
      <h1 className={styles.header}>Uncontrolled form</h1>
      <div className={styles.row}>
        <label>Name *</label>
        <input ref={nameRef} />
        <span className={styles.error}> {errors['name']}</span>
      </div>
      <div className={styles.row}>
        <label>Age *</label>
        <input ref={ageRef} />
        <span className={styles.error}>{errors['age']}</span>
      </div>
      <div className={styles.row}>
        <label>Email *</label>
        <input ref={emailRef} />
        <span className={styles.error}>{errors['email']}</span>
      </div>
      <div className={`${styles.row}`}>
        <div className={styles.passwordsContainer}>
          <div className={styles.password}>
            <label>Password *</label>
            <div className={styles.passwordInputWrapper}>
              <input
                className={styles.passwordInput}
                type={isPasswordShown ? 'text' : 'password'}
                ref={passwordRef}
              />
              <div
                className={isPasswordShown ? `${styles.showPassword}` : `${styles.hidePassword}`}
                onClick={handleTogglePassword}
              ></div>
            </div>
            <span className={styles.error}>{errors['password']}</span>
          </div>
          <div className={styles.password}>
            <label>Confirm password *</label>
            <div className={styles.passwordInputWrapper}>
              <input
                className={styles.passwordInput}
                type={isConfirmPasswordShown ? 'text' : 'password'}
                ref={confirmPasswordRef}
              />
              <div
                className={
                  isConfirmPasswordShown ? `${styles.showPassword}` : `${styles.hidePassword}`
                }
                onClick={handleToggleConfirmPassword}
              ></div>
            </div>
            <span className={styles.error}>{errors['confirmPassword']}</span>
          </div>
        </div>
      </div>
      <div className={styles.radio_buttons__wrapper}>
        <label>What is your gender *</label>
        <div className={styles.radio_buttons}>
          <input type="radio" name="gender" value="male" ref={maleRef} />
          <label htmlFor="male">male</label>

          <input type="radio" name="gender" value="female" ref={femaleRef} />
          <label htmlFor="female">female</label>
        </div>
        {errors.sex && <span className={styles.error}>{errors['sex']}</span>}
      </div>
      <div className={`${styles.inlineRow}`}>
        <input type="checkbox" ref={acceptRef} />
        <label htmlFor="acceptTerms">Accept Terms & Conditions *</label>
        <span className={styles.error}>{errors['acceptTerms']}</span>
      </div>
      <div className={styles.row}>
        <label htmlFor="image">Upload image: * </label>
        <div>
          <input
            type="file"
            ref={imageRef}
            onChange={(e) => {
              handleImageChange(e);
            }}
          />
          {errors.image && typeof errors.image === 'string' && (
            <span className={styles.error}>{errors.image}</span>
          )}
        </div>
      </div>
      <div className={styles.row}>
        <UncontrolledAutocomplete
          inputRef={countryRef}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          error={errors.country}
        />
      </div>
      <input className={styles.submitButton} type="submit" />
    </form>
  );
};

export default UncontrolledForm;
