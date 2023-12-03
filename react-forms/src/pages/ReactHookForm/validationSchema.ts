import * as yup from 'yup';

export const schema = yup.object({
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
  acceptTerms: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  image: yup
    .mixed<FileList>()
    .test('extension', 'Image is required', (value) => {
      return value?.length == 1;
    })
    .test('extension', 'Only the following formats are accepted: .jpeg, .png', (value) => {
      if (!value?.length) return false;
      return value[0].type == 'image/png' || value[0].type === 'image/jpeg';
    })
    .test('fileSize', 'Max allowed size is 100KB', (value) => {
      if (!value?.length) return false;
      return value[0].size <= 102400;
    }),
});
