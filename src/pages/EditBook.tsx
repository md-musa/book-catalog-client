import { Card, Input, Button, Typography } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';
import { useGetSingleBookQuery, useUpdateBookMutation } from '../store/features/books/bookApiSlice';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function EditBook() {
  const { id } = useParams();

  const { data: bookData, isLoading: isBookLoading } = useGetSingleBookQuery(id);
  const [updateBook, { isError, error, isSuccess, data }] = useUpdateBookMutation();

  const [title, setTitle] = useState(bookData?.data.title || '');
  const [author, setAuthor] = useState(bookData?.data.author || '');
  const [genre, setGenre] = useState(bookData?.data.genre || '');
  const [publicationDate, setPublicationDate] = useState(bookData?.data.publicationDate || '');
  const [] = useState(bookData?.data.details || '');

  const handleEditBook = (): void => {
    const data = {
      title,
      author,
      genre,
      publicationDate,
    };

    updateBook({ bookId: id, updatedData: data });
  };

  useEffect(() => {
    if (isError) {
      const { message } = error?.data;
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(data?.message);
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublicationDate('');
    }
  }, [isSuccess, isError]);

  if (isBookLoading) return <p>Loading...</p>;

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
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <Input
              size="lg"
              label="Author"
              required
              value={author}
              onChange={e => setAuthor(e.target.value)}
            />
            <Input
              size="lg"
              label="Genre"
              required
              value={genre}
              onChange={e => setGenre(e.target.value)}
            />
            <input
              className="border border-gray-500 rounded-md cursor-pointer py-2 px-1 outline-none"
              type="date"
              required
              value={publicationDate}
              onChange={e => setPublicationDate(e.target.value)}
            />
          </div>

          <Button onClick={handleEditBook} className="mt-6" fullWidth>
            Add
          </Button>
        </form>
      </Card>
    </div>
  );
}
