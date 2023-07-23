import { useState, ChangeEvent, FormEvent } from 'react';
import BookCard from '../components/BookCard';
import { Button, Input } from '@material-tailwind/react';
import { useGetBooksQuery, Book } from '../store/features/books/bookApiSlice';

interface IParams {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
}

function AllBooks() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [publicationYear, setPublicationYear] = useState<string>('');

  const [genreValue, setGenreValue] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const params: IParams = {};
  if (searchTerm) params.searchTerm = searchTerm;
  if (genre) params.genre = genre;
  if (publicationYear) params.publicationYear = publicationYear;

  const { data, isLoading } = useGetBooksQuery(params);
  if (isLoading) return <p>Loading...</p>;

  const books = data?.data;

  function setFilteringValues(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    setGenre(genreValue);
    setPublicationYear(date);
  }

  console.log(data);

  return (
    <div className="grid grid-cols-[1fr_4fr] space-x-3">
      <div className="border-r-2 py-20 px-4 space-y-4">
        <p className="text-gray-800">Filter books</p>
        <div>
          <Input
            value={genreValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setGenreValue(e.target.value)}
            label="Genre"
          />
        </div>

        <div>
          <Input
            type="number"
            value={date}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
            label="Publication Year"
          />
        </div>
        <Button onClick={setFilteringValues} className="w-full" variant="gradient">
          Search
        </Button>
      </div>

      <div className="w-full">
        <div className="mt-4 flex justify-center">
          <div className="">
            <input
              type="text"
              className="px-4 outline-none h-[50px] w-[30rem] rounded-full text-lg focus:!border-t-blue-500 focus:!border-blue-500 ring-4 ring-transparent focus:ring-blue-500/20 !border-2 !border-blue-gray-50 bg-white shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500"
              placeholder="Search books"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="my-10 grid grid-cols-4 gap-2">
          {books?.map((book: Book) => (
            <BookCard book={book} key={book._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBooks;
