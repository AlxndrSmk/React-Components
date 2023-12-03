import { UseFormRegister, UseFormSetValue, UseFormTrigger } from 'react-hook-form';

export interface PasswordStrengthProps {
  password: string;
}

export interface FormData {
  confirmPassword?: string | undefined;
  acceptTerms?: boolean | undefined;
  name?: string;
  age?: number;
  sex?: string;
  country?: string;
  image?: unknown | File;
  email?: string;
  password?: string;
}

export interface SubmitForm extends FormData {
  image: string;
}

export type Register = UseFormRegister<FormData>;
export type SetValue = UseFormSetValue<FormData>;
export type Trigger = UseFormTrigger<FormData>;
