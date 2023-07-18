import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { StarIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useAddToWishlistMutation } from '../store/features/wishlist/wishlistApiSlice';
import { useAddToReadingListMutation } from '../store/features/readingList/readingListApiSlice';

export default function BookCard(props: any) {
  const navigate = useNavigate();
  const { _id, title, image, details } = props.book;

  const [addToWishList] = useAddToWishlistMutation();

  function handleAddToWishList(id: string) {
    addToWishList(id);
  }

  const [readSoon] = useAddToReadingListMutation();
  function handleReadSoon(id: string) {
    readSoon(id);
  }

  return (
    <>
      <Card className="w-full max-w-[26rem] shadow-md border-2 border-[#f0f0f0]">
        <CardHeader floated={false} color="blue-gray">
          <img className="h-36" src={image} alt="" />
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
        <CardBody>
          <div className="mb-3 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray" className="font-medium">
              {title}
            </Typography>
            <Typography color="blue-gray" className="flex items-center gap-1.5 font-normal">
              <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
              5.0
            </Typography>
          </div>
          <Typography color="gray">{details}</Typography>
        </CardBody>
        <CardFooter className="pt-3 space-y-3">
          <Button onClick={() => navigate(`/all-books/${_id}`)} size="sm" fullWidth={true}>
            Details
          </Button>
          <Button variant="outlined" onClick={() => handleReadSoon(_id)} size="sm" fullWidth={true}>
            Read Soon
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
