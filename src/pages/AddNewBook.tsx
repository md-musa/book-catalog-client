import { Card, Input, Checkbox, Button, Typography, Textarea } from '@material-tailwind/react';
import { toast } from 'react-toast';

export default function AddNewBook() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <Card className="shadow-xl border-2 border-[#ededed] p-6" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add new book
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your book details to add.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Title" required />
            <Input size="lg" label="Author" required />
            <Input size="lg" label="Genre" required />
            <Input size="lg" label="Image URL" required />
            <Input size="lg" label="Language" required />
            <input type="date" />

            <Textarea label="Details" />
          </div>

          <Button onClick={() => toast.success('Hello')} className="mt-6" fullWidth>
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}
