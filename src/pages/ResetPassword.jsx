import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosPublicInstance } from '../config/axios';
import FormTextInput from '../layouts/FormTextInput';
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const schema = yup.object({
  password: yup
    .string()
    .required('password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: yup
    .string()
    .required('confirm Password is Required')
    .oneOf([yup.ref('password')], "confirm password doesn't match"),
})
const ResetPassword = () => {
    const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const code = searchParams.get('code')
  //console.log(code)
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
      const response = await axiosPublicInstance.post('/auth/reset-password', {
        code: code,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      })
      console.log(response.data)
      toast.success(
        'Password resetted successfully, now you can login with updated password'
      )
      navigate('/login')
    } catch (err) {
      console.log(err.response)
      toast.error('Issue in Resetting password please try again')
    }
  }

  return (
    <>
      <h2 className='text-center mb-3'>Forgot Password ?</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name='password'
          type='password'
          label='password'
          placeholder='Enter Your password'
          errors={errors}
          register={register}
        />
        <FormTextInput
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          placeholder='Confirm your password '
          errors={errors}
          register={register}
        />
        <Button
          variant='primary'
          size='md'
          type='submit'
          disabled={isSubmitting ? 'disabled' : ''}
          className='text-center d-inline-block w-auto'
        >
          Reset Password
        </Button>
      </Form>
    </>
  )
}

export default ResetPassword;
