import { useState, useEffect } from 'react';
import { Card, Input, Button, Typography, Textarea } from '@material-tailwind/react';
import { toast } from 'react-hot-toast';
import { usePostBookMutation } from '../store/features/books/bookApiSlice';

export default function AddNewBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [language, setLanguage] = useState('');
  const [date, setDate] = useState('');
  const [details, setDetails] = useState('');

  const [addBook, { isSuccess, isError, error, data: response }] = usePostBookMutation();
  console.log(response);

  useEffect(() => {
    if (isSuccess) {
      const message = response?.message;
      if (message) toast.success(message);
      setTitle('');
      setAuthor('');
      setGenre('');
      setImageUrl('');
      setLanguage('');
      setDate('');
      setDetails('');
    }
    if (isError) {
      const { message } = error?.data;
      toast.error(message);
    }
  }, [isError, isSuccess]);

  const handleAddBook = () => {
    const data = {
      title,
      author,
      genre,
      image: imageUrl,
      language,
      publicationDate: date,
      details,
    };

    addBook(data);
  };

  return (
    <div className="my-10 w-full flex justify-center items-center">
      <Card className="shadow-xl border-2 border-[#ededed] p-6" color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Add new book
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your book details to add.
        </Typography>

        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <Input
              size="lg"
              label="Author"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              required
            />
            <Input
              size="lg"
              label="Genre"
              value={genre}
              onChange={e => setGenre(e.target.value)}
              required
            />
            <Input
              size="lg"
              label="Image URL"
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              required
            />
            <Input
              size="lg"
              label="Language"
              value={language}
              onChange={e => setLanguage(e.target.value)}
              required
            />
            <input
              className="border border-gray-500 rounded-md cursor-pointer py-2 px-1 outline-none"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />

            <Textarea
              label="Details"
              value={details}
              onChange={e => setDetails(e.target.value)}
              required
            />
          </div>

          <Button onClick={handleAddBook} className="mt-6" fullWidth>
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}
