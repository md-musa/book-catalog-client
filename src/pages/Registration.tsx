import { Card, Input, Checkbox, Button, Typography } from '@material-tailwind/react';
import { toast } from 'react-toast';

export default function Registration() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Card className="shadow-xl border-2 border-[#ededed] p-6" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="md" label="First Name" required />
            <Input size="md" label="Last Name" required />
            <Input size="lg" label="Email" required />
            <Input type="password" size="lg" label="Password" required />
          </div>

          <Button onClick={() => toast.success('Hello')} className="mt-6" fullWidth>
            Register
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{' '}
            <a href="#" className="font-medium text-blue-500 transition-colors hover:text-blue-700">
              Sign In
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
