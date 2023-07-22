import BookCard from '../components/BookCard';
import { useGetBooksQuery } from '../store/features/books/bookApiSlice';

function Home() {
  const { data, isError, isSuccess, isLoading } = useGetBooksQuery(undefined);
  if (isLoading) return <p>Loading...</p>;

  const books = data?.data;
  console.log(data);
  return (
    <div>
      <div className="w-full">
        <img
          className="w-full object-contain rounded-md"
          src="https://static.vecteezy.com/system/resources/previews/002/125/926/non_2x/reading-day-banner-with-people-reading-books-vector.jpg"
          alt=""
        />
      </div>
      <div className="my-10 grid grid-cols-5 gap-4">
        {books?.map(book => (
          <BookCard book={book} key={book._id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
