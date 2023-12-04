import { MutableRefObject } from 'react';
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
  image?: string;
}

export interface SubmitUncontrolledForm extends FormData {
  image?: File;
}

export type Register = UseFormRegister<FormData>;
export type SetValue = UseFormSetValue<FormData>;
export type Trigger = UseFormTrigger<FormData>;

export type FormField =
  | 'name'
  | 'age'
  | 'sex'
  | 'country'
  | 'image'
  | 'email'
  | 'password'
  | 'confirmPassword';

export interface UncontrolledAutocompleteProps {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | undefined;
}

export interface ControlledAutocompleteProps {
  setCountriesFilteredVisible: React.Dispatch<React.SetStateAction<boolean>>;
  register: Register;
  setValue: SetValue;
  trigger: Trigger;
  countriesFilteredVisible: boolean;
  watchCountry: string | undefined;
  error: string | undefined;
}
