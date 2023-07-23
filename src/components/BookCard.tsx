import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
  Rating,
} from '@material-tailwind/react';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useAddToWishlistMutation } from '../store/features/wishlist/wishlistApiSlice';
import { useAddToReadingListMutation } from '../store/features/readingList/readingListApiSlice';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function BookCard(props: any) {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const { _id, title, image, author, genre, publicationDate } = props.book;

  const [
    readSoon,
    {
      isSuccess: isReadingListBookSuccess,
      error: readingListBookError,
      isError: isReadingListBookError,
      data: readingListBook,
    },
  ] = useAddToReadingListMutation();

  function handleReadSoon(id: string) {
    if (auth.accessToken) readSoon(id);
    else navigate('/login');
  }

  useEffect(() => {
    if (isReadingListBookSuccess) {
      const message = readingListBook?.message;
      if (message) toast.success(message);
    }
    if (isReadingListBookError) {
      const { message } = readingListBookError?.data;
      toast.error(message);
    }
  }, [isReadingListBookError, isReadingListBookSuccess]);

  return (
    <Card className="w-full max-w-[26rem] shadow-md border-2 border-[#f0f0f0]">
      <CardHeader floated={false} color="blue-gray">
        <img className="h-44 text-center mx-auto cursor-pointer" src={image} alt="" />
        <div
          onClick={() => navigate(`/all-books/${_id}`)}
          className="cursor-pointer to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 "
        />
      </CardHeader>
      <CardBody
        onClick={() => navigate(`/all-books/${_id}`)}
        className="hover:underline cursor-pointer"
      >
        <Typography variant="h6" color="blue-gray" className="font-medium">
          {title.length < 40 ? title : `${title.slice(0, 40)}...`}
        </Typography>

        <div className="my-2">
          <p className="text-sm">
            <span className="text-black">Author:</span>
            {' ' + author}
          </p>
          <p className="text-sm">
            <span className="text-black">Genre:</span>
            <span className="bg-green-100 text-green-600 px-1 rounded-md">{' ' + genre}</span>
          </p>
          <p className="text-sm">
            <span className="text-black">Publication:</span>
            <span className="text-[12px]"> {new Date(publicationDate).toDateString()}</span>
          </p>
        </div>
      </CardBody>

      <Button
        className="mx-8 my-2 border"
        variant="text"
        onClick={() => handleReadSoon(_id)}
        size="sm"
        fullWidth={false}
      >
        Read Soon
      </Button>
    </Card>
  );
}
