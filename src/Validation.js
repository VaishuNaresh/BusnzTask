import * as yup from 'yup'
export const formSchema = yup.object().shape({
  username: yup.string().required('UserName is Required'),
  email: yup.string().email('Invalid Email Address').required('Email is required'),
  password: yup.string().min(8,'Password must be at least 8 characters').max(16).required(),
  confirmPassword:yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})
 