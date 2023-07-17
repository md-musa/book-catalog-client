import BookCard from '../components/BookCard';
import { useGetBooksQuery } from '../store/features/books/bookApiSlice';

function Home() {
  const { data, isError, isSuccess, isLoading } = useGetBooksQuery(undefined);
  if (isLoading) return <p>Loading...</p>;

  const books = data?.data;
  console.log(data);
  return (
    <div className="my-10 grid grid-cols-4 gap-4">
      {books?.map(book => (
        <BookCard book={book} key={book._id} />
      ))}
    </div>
  );
}

export default Home;
