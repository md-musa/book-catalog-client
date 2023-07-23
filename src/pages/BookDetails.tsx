import { Avatar, Button, IconButton, Rating, Textarea, Typography } from '@material-tailwind/react';
import { HeartIcon } from '@heroicons/react/24/solid';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
  usePostBookReviewMutation,
} from '../store/features/books/bookApiSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  useAddToWishlistMutation,
  useGetWishlistQuery,
} from '../store/features/wishlist/wishlistApiSlice';

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useSelector(state => state.auth);
  console.log(auth);

  const { data: bookData, isLoading: isBookLoading } = useGetSingleBookQuery(id);
  const [postBookReview] = usePostBookReviewMutation();
  const [deleteBook, { isSuccess, isError, data: response, error }] = useDeleteBookMutation();
  const { data: wishlists } = useGetWishlistQuery(undefined);
  // console.log(
  //   '🚀 ~ file: BookDetails.tsx:35 ~ BookDetails ~ wishlists:',
  //   wishlists?.data?.[0].book._id,
  //   id
  // );

  const isBookInWishlist = wishlists?.data?.filter(item => item?.book?._id == id) || [];
  console.log('🚀 ~ file: BookDetails.tsx:45 ~ BookDetails ~ isBookInWishlist:', isBookInWishlist);

  useEffect(() => {
    if (isSuccess) {
      const message = response?.message;
      if (message) toast.success(message);
      navigate(-1);
    }
    if (isError) {
      const { message } = error?.data;
      toast.error(message);
    }
  }, [isError, isSuccess]);

  const handleBookDeletion = (bookId: string): void => {
    if (confirm('Are you sure?')) {
      deleteBook(bookId);
    }
  };

  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<number>(1);

  const handleReviewSubmission = (bookId: string): void => {
    postBookReview({
      bookId,
      rating,
      description,
    });
  };

  const [
    addToWishList,
    {
      isSuccess: isWishlistSuccess,
      isError: isWishlistError,
      error: wishlistError,
      data: wishlistBook,
    },
  ] = useAddToWishlistMutation();

  useEffect(() => {
    if (isWishlistSuccess) {
      const message = wishlistBook?.message;
      if (message) toast.success(message);
    }
    if (isWishlistError) {
      const { message } = wishlistError?.data;
      toast.error(message);
    }
  }, [isWishlistSuccess, isWishlistError]);

  function handleAddToWishList(id: string) {
    if (auth.accessToken) addToWishList(id);
    else navigate('/login');
  }

  if (isBookLoading) return <p>Loading...</p>;
  const { _id, title, image, genre, publicationDate, language, details, reviews } = bookData?.data;

  return (
    <div className="grid grid-cols-[1fr_2fr] space-x-5">
      <div className="p-4">
        <img className="object-contain" src={image} alt="" />
      </div>

      <div className="p-5 space-y-2">
        <Typography className="text-2xl">{title}</Typography>
        <div className="flex space-x-4">
          <Rating value={4} readonly />
          <Typography color="blue-gray" className="font-medium">
            {'xx'}.0 Rated
          </Typography>
        </div>
        <p>
          <span className="font-semibold">Language:</span>
          {' ' + language}
        </p>
        <p>
          <span className="font-semibold">Genre:</span>
          {' ' + genre}
        </p>
        <p>
          <span className="font-semibold">Publication Date:</span>
          {' ' + new Date(publicationDate).toDateString()}
        </p>

        <p className="font-semibold">Description:</p>
        <p className="text-gray-800">{details}</p>
        <br />
        <br />
        <br />
        <p className="my-2">Please submit your review:</p>
        <div>
          <div className="flex space-x-4 my-3 text-xl">
            <Rating className="" value={rating} onChange={value => setRating(value)} />
            <Typography color="blue-gray" className="font-medium">
              {rating}.0 Rated
            </Typography>
          </div>
          <Textarea
            label="Message"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <Button onClick={() => handleReviewSubmission(_id)} variant="gradient">
            Submit
          </Button>
        </div>

        {/* all reviews */}
        <div>
          {reviews.map(review => (
            <div className="border-t border-b py-3 flex space-x-3">
              <Avatar
                src="https://www.pngarts.com/files/3/Boy-Avatar-PNG-Transparent-Image.png"
                alt="avatar"
                variant="square"
              />
              <div className="">
                <p>{auth?.user?.name.firstName + ' ' + auth?.user?.name.lastName}</p>
                <div className="flex space-x-2">
                  <Rating value={review.rating} readonly />
                  <Typography color="blue-gray" className="font-medium">
                    {review.rating}.0 Rated
                  </Typography>
                </div>
                <p className="my-2">{review.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute flex right-10 space-x-4">
        <IconButton
          onClick={() => handleAddToWishList(_id)}
          size="sm"
          color={isBookInWishlist.length || false ? 'red' : 'gray'}
          variant="text"
          className="rounded-full"
        >
          <HeartIcon className="h-6 w-6" />
        </IconButton>
        <Button
          onClick={() => navigate(`/edit-book-details/${_id}`)}
          color="blue"
          size="sm"
          className="shadow-sm"
        >
          Edit
        </Button>
        <Button onClick={() => handleBookDeletion(_id)} color="red" size="sm" className="shadow-md">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BookDetails;
