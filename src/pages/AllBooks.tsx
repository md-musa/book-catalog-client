import React from 'react';
import BookCard from '../components/BookCard';
import { Button, Input, Option, Select } from '@material-tailwind/react';
import { useGetBooksQuery } from '../store/features/books/bookApiSlice';

function AllBooks() {
  const { data, isError, isSuccess, isLoading } = useGetBooksQuery(undefined);
  if (isLoading) return <p>Loading...</p>;

  const books = data?.data;
  console.log(data);

  return (
    <div className="grid grid-cols-[1fr_4fr] space-x-3">
      <div className="border-r-2 py-20 px-4 space-y-4">
        <p className="text-gray-800">Filter the books</p>
        <div>
          <Input label="Genre" />
        </div>

        <div>
          <Input label="Publication Year" />
        </div>
        <Button className="w-full" variant="gradient">
          Search
        </Button>
      </div>

      <div className="w-full">
        <div className="mt-4 flex justify-center">
          <div className="">
            <Input
              type="text"
              placeholder="Search your book"
              className="h-[50px] w-[30rem] rounded-full text-lg focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border-2 !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
              labelProps={{
                className: 'hidden',
              }}
              containerProps={{ className: 'min-w-[100px]' }}
            />
          </div>
        </div>
        <div className="my-10 grid grid-cols-3 gap-4">
          {books?.map(book => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBooks;
