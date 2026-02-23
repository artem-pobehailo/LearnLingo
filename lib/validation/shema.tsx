import * as yup from 'yup';

export const bookSchema = yup.object({
  username: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed')
    .min(2, 'Name is too short')
    .required('Name is required'),

  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,14}$/, 'Phone number must be valid (10–14 digits)')
    .required('Phone number is required'),

  reason: yup.string().required('Please select a learning reason'),
});
export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password too short')
    .required('Password is required'),
});

export const registrationSchema = yup.object({
  name: yup
    .string()
    .matches(/^[A-Za-z\s]+$/, 'Only English letters allowed')
    .min(2, 'Name too short')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password too short')
    .required('Password is required'),
});
