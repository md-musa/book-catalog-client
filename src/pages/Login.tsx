import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toast';
import { useLoginUserMutation } from '../store/api/authApi';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { store } from '../store/configureStore';
import { setCredentials } from '../store/features/auth/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('musa@gmail.com');
  const [password, setPassword] = useState('123456');

  const [loginUser, { data, error, isSuccess, isError }] = useLoginUserMutation();

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

  function handleLogin() {
    loginUser({ email, password });
  }
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="shadow-xl border-2 border-[#ededed] p-6" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to login.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Email" required value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" size="lg" label="Password" value={email} onChange={e => setPassword(e.target.value)} required />
          </div>

          <Button onClick={handleLogin} className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{' '}
            <Link to="/registration" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
