import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
  Rating,
} from '@material-tailwind/react';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { useRemoveFromWishlistMutation } from '../store/features/wishlist/wishlistApiSlice';

export default function WishlistCard(props: any) {
  console.log('🚀 ~ file: WishlistCard.tsx:15 ~ WishlistCard ~ props:', props);

  const navigate = useNavigate();
  if (!props.book.book) return;
  const { _id, title, image } = props.book.book;

  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  function handleWishlistDeletion(id: string) {
    removeFromWishlist(id);
  }

  return (
    <Card className="w-full max-w-[26rem] shadow-md border-2 border-[#f0f0f0]">
      <CardHeader floated={false} color="blue-gray">
        <img className="h-44 text-center mx-auto cursor-pointer" src={image} alt="" />
        <div
          onClick={() => navigate(`/all-books/${_id}`)}
          className="cursor-pointer to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 "
        />

        <IconButton
          onClick={() => handleWishlistDeletion(_id)}
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <TrashIcon className="h-6 w-6" />
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
    </Card>
  );
}
