import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layouts/FormTextInput';
import { toast } from 'react-toastify'
import { axiosPublicInstance } from '../config/axios';

const schema = yup.object({
    email: yup.string().email().required('Email is Required'),
  })
const ForgotPassword = () => {
   
        const {
            register,
            handleSubmit,
            formState: { errors },
            isSubmitting,
          } = useForm({
            resolver: yupResolver(schema),
          })
        
          const onSubmit = async (data) => {
            try {
              const response = await axiosPublicInstance.post(
                '/auth/forgot-password',
                {
                  email: data.email,
                  
                }
              )
              console.log(response.data)
              toast.success('Email is sent successfully with password reset link')
            } catch (err) {
              console.log(err)
              toast.error('Error in sending email')
            }
          }
        
          return (
            <>
              <h2 className='text-center mb-3'>Forgot Password ?</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormTextInput
                  name='email'
                  label='Email'
                  placeholder='Enter Your Email'
                  errors={errors}
                  register={register}
                  defaultValue='akthernasrin740@gmail.com'
                />
                <Button
                  variant='primary'
                  size='md'
                  type='submit'
                  disabled={isSubmitting ? 'disabled' : ''}
                  className='text-center d-inline-block w-auto'
                >
                  Submit
                </Button>
              </Form>
              </>
    );
}

export default ForgotPassword;
