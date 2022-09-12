import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { authContext } from '../components/authContext/AuthContext'
import FormTextInput from '../layouts/FormTextInput'
import { Link } from 'react-router-dom'

const schema = yup.object({
  email: yup.string().required('Email is Required'),
  password: yup.string().required('password is required'),
})

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const { login } = useContext(authContext)

  const onSubmit = (data) => {

    //registering user
    login({
      identifier: data.email,
      password: data.password,
    })
  }

  return (
    <>
      <h2 className='text-center mb-3'>Login</h2>
      <div className='form'>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTextInput
        name='email'
        label='Email'
        placeholder='Enter Your Email'
        errors={errors}
        register={register}
        defaultValue='nasreen.akter34@gmail.com'
      />
      <FormTextInput
        name='password'
        label='password'
        placeholder='Enter password'
        errors={errors}
        register={register}
        type='password'
        defaultValue='Nas123.@'
      />

      <Button
        variant='primary'
        size='md'
        type='submit'
        disabled={isSubmitting ? 'disabled' : ''}
        className='text-center d-inline-block w-auto'
      >
        Login
      </Button>
      <p className='mt-3'><Link to='/forgot-password'>Forgot your password.</Link></p>
    </Form>
      </div>
     
    </>
  )
}

export default Login;
