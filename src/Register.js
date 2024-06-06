import React,{useState} from 'react'
import axios from 'axios'
import { Card, CardHeader, CardTitle,  Label,FormFeedback } from 'reactstrap'
import { formSchema } from './Validation'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from 'classnames';

const RegisterForm = () => {
const [error,setError]=useState('')
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
     mode:'onChange',
     resolver: yupResolver(formSchema),
      defaultValues: {
    username:'',
  email: '',
  password: ''
    }
  });
  const onSubmit = async (values,e) => {
    e.preventDefault()

  const formData = {
    username: values.username,
    email: values.email,
    password: values.password
  };
    try {
      await axios.post('http://localhost:8080/api/users', formData);
      console.log('Form data submitted successfully',formData);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
        <CardHeader className="mt-4" style={{ color: "white" }}>
       <center> <CardTitle tag='h2'>REGISTRATION FORM</CardTitle></center>
      </CardHeader>
      {/* <h2 style={{ color: "white" }} ><center>REGISTRATION FORM</center></h2> */}
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)} >
                <Label for="username" >
               User Name <span className="text-danger"></span>
                </Label>
               <input
  id="username"
  name="username"
  placeholder="Jhon Doe"
   {...register('username')} 
   invalid={!!errors.username}
  className={classNames({ 'is-invalid': !!errors.username })}
/>
       {errors && errors.username && <FormFeedback style={{color:"white"}}>{errors.username.message}</FormFeedback>}
                <Label for="email">
               Email <span className="text-danger"></span>
                </Label>
               <input
  id="email"
  name="email"
  placeholder="vaishu@gmail.com"
   {...register('email')} 
  invalid={!!errors.email}
  className={classNames({ 'is-invalid': !!errors.email})}
          />
          {errors && errors.email && <FormFeedback style={{color:"white"}}>{errors.email.message}</FormFeedback>}
                <Label for="password">
              Password<span className="text-danger"></span>
                </Label>
               <input
  id="password"
  name="password"
  placeholder="abcdk@123"
   {...register('password')} 
  invalid={!!errors.password}
  className={classNames({ 'is-invalid': !!errors.password})}
          />
            {errors && errors.password && <FormFeedback style={{color:"white"}}>{errors.password.message}</FormFeedback>}
                <Label for="confirmPassword">
               Confirm Password<span className="text-danger"></span>
                </Label>
               <input
  id="confirmPassword"
  name="confirmPassword"
  placeholder="abcdk@123"
   {...register('confirmPassword')} 
  invalid={!!errors.confirmPassword}
  className={classNames({ 'is-invalid': !!errors.confirmPassword })}
          />
           {errors && errors.confirmPassword && <FormFeedback style={{color:"white"}}>{errors.confirmPassword.message}</FormFeedback>}
        <button className='submit'type='submit' value='submit'>Register</button>
        </form >
    </div> </> 
  )
}

export default RegisterForm