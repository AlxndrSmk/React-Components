import * as yup from 'yup';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { COUNTRIES } from '../constatns/countries';

export const schema = yup.object().shape({
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
  sex: yup.string().required('Gender is required').oneOf(['male', 'female']),
  acceptTerms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  image: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Invalid file type, only JPEG and PNG are allowed', (value) => {
      const file = value as File;
      return !file || ['image/jpeg', 'image/png'].includes(file.type);
    })
    .test('fileSize', 'Max allowed size is 100KB', (value) => {
      const file = value as File;
      return !file || file.size <= 102400;
    }),
  country: yup
    .string()
    .required('Country is required')
    .test('isValidCountry', 'Invalid country selected', function (value) {
      return COUNTRIES.map((el) => el.toLowerCase()).includes(value?.toLowerCase());
    }),
});
