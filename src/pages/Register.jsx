import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormTextInput from '../layouts/FormTextInput'
import { useContext } from 'react'
import { authContext } from '../components/authContext/AuthContext'

const Register = () => {
    const {registerUser} = useContext(authContext);
  const schema = yup.object({
    username: yup
      .string()
      .required("username is Required")
      .min(5, "username must be 5 or more character in length"),
    email: yup
      .string()
      .email("Must be a valid email")
      .lowercase()
      .required("Email is Required"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirmPassword: yup
      .string()
      .required("confirm Password is Required")
      .oneOf([yup.ref("password")], "confirm password doesn't match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) =>{
    registerUser(data);
  }
  return (
    <>
      <h2 className="text-center mb-3">Register</h2>
      <div className='form'>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <FormTextInput
        name="username"
        label="user name"
        placeholder="Enter Your user name"
        errors={errors}
        register={register}
        defaultValue="nasreen"
      />
      <FormTextInput
        name="email"
        label="Email"
        placeholder="Enter Your Email"
        errors={errors}
        register={register}
        defaultValue="nasreen.akter34@gmail.com"
      />
      <FormTextInput
        name="password"
        label="password"
        placeholder="Enter password"
        errors={errors}
        register={register}
        type="password"
        defaultValue="Nas123.@"
      />
      <FormTextInput
        name="confirmPassword"
        label="confirm Password"
        placeholder="Confirm password"
        errors={errors}
        register={register}
        type="password"
        defaultValue="Nas123.@"
      />

      <Button
        variant="primary"
        size="md"
        type="submit"
        disabled={isSubmitting ? "disabled" : ""}
        className="text-center d-inline-block w-auto"
      >
        Register
      </Button>
    </Form>
      </div>
     
    </>
  );
};

export default Register;
