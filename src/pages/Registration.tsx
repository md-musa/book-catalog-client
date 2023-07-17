import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useRegisterUserMutation, useregisterUserMutation } from '../store/features/auth/authApiSlice';
import { toast } from 'react-toast';
import { store } from '../store/configureStore';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/features/auth/authSlice';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('md');
  const [lastName, setLastName] = useState('musa');
  const [email, setEmail] = useState('musa@gmail.com');
  const [password, setPassword] = useState('123456');

  const userData = {
    name: {
      firstName,
      lastName,
    },
    email,
    password,
  };

  const [registerUser, { data, error, isSuccess, isError }] = useRegisterUserMutation();

  useEffect(() => {
    if (isError) {
      const { message } = error?.data;
      toast.error(message);
    }
    if (isSuccess) {
      const { user, accessToken } = data.data;
      toast.success(data.message);
      dispatch(setCredentials({ user, accessToken }));
      navigate('/');
    }
  }, [isSuccess, isError]);

  console.log('STORE=> ', store.getState());

  function handleRegistration() {
    registerUser(userData);
  }

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="shadow-xl border-2 border-[#ededed] p-6" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>

        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="md" label="First Name" required value={firstName} onChange={e => setFirstName(e.target.value)} />
            <Input size="md" label="Last Name" required value={lastName} onChange={e => setLastName(e.target.value)} />
            <Input size="lg" label="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" size="lg" label="Password" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>

          <Button onClick={handleRegistration} className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
