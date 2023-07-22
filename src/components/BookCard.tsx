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
  const { _id, title, image } = props.book;

  const [addToWishList, { isSuccess, isError, error, data: wishlistBook }] =
    useAddToWishlistMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = wishlistBook?.message;
      if (message) toast.success(message);
    }
    if (isError) {
      const { message } = error?.data;
      toast.error(message);
    }
  }, [isError, isSuccess]);

  function handleAddToWishList(id: string) {
    if (auth.accessToken) addToWishList(id);
    else navigate('/login');
  }

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
    <>
      <Card className="w-full max-w-[26rem] shadow-md border-2 border-[#f0f0f0]">
        <CardHeader floated={false} color="blue-gray">
          <img className="h-44 text-center mx-auto" src={image} alt="" />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />

          <IconButton
            onClick={() => handleAddToWishList(_id)}
            size="sm"
            color="red"
            variant="text"
            className="!absolute top-4 right-4 rounded-full"
          >
            <HeartIcon className="h-6 w-6" />
          </IconButton>
        </CardHeader>
        <CardBody
          onClick={() => navigate(`/all-books/${_id}`)}
          className="hover:underline cursor-pointer"
        >
          <Typography variant="h6" color="blue-gray" className="font-medium text-center">
            {title.length < 40 ? title : `${title.slice(0, 40)}...`}
          </Typography>

          <Typography
            color="blue-gray"
            className="flex justify-center items-center gap-1.5 font-normal"
          >
            <Rating value={5} readonly />
            5.0
          </Typography>
        </CardBody>

        <Button
          className="mx-4 my-2 border"
          variant="text"
          onClick={() => handleReadSoon(_id)}
          size="sm"
          fullWidth={false}
        >
          Read Soon
        </Button>
      </Card>
    </>
  );
}
