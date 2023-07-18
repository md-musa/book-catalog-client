import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from '@material-tailwind/react';
import { StarIcon, TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useRemoveFromWishlistMutation } from '../store/features/wishlist/wishlistApiSlice';
import { useMarkAsFinishedMutation } from '../store/features/readingList/readingListApiSlice';

export default function WishlistCard(props: any) {
  const { _id, title, image, details } = props.book.book;

  const [updateStatus] = useMarkAsFinishedMutation();

  function handleMarkAsFinished(id: string) {
    updateStatus({
      bookId: id,
      status: 'finished',
    });
  }

  return (
    <Card className="w-full max-w-[26rem] shadow-md border-2 border-[#f0f0f0]">
      <CardHeader floated={false} color="blue-gray">
        <img className="h-36" src={image} alt="" />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <p className="bg-gray-600 p-2 text-lg uppercase text-left font-bold">{props.book.status}</p>
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
      <CardFooter className="pt-3">
        <Button onClick={() => handleMarkAsFinished(_id)} size="sm" fullWidth={true}>
          Mark as Finished
        </Button>
      </CardFooter>
    </Card>
  );
}
