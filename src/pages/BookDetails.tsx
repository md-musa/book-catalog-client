import { Button, Rating, Textarea, Typography } from '@material-tailwind/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useDeleteBookMutation,
  useGetSingleBookQuery,
  usePostBookMutation,
  usePostBookReviewMutation,
} from '../store/features/books/bookApiSlice';

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: bookData, isLoading: isBookLoading } = useGetSingleBookQuery(id);
  const [deleteBook] = useDeleteBookMutation();
  const [postBookReview] = usePostBookReviewMutation();

  console.log('book data--------------');
  console.log(bookData);

  const handleBookDeletion = (bookId: string): void => {
    deleteBook(bookId);
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

  if (isBookLoading) return <p>Loading...</p>;
  const { _id, title, image, genre, publicationDate, language, details, reviews } = bookData?.data;

  return (
    <div className="grid grid-cols-[1fr_2fr] space-x-5">
      <div className="p-4">
        <img src={image} alt="" />
      </div>

      <div className="p-5 space-y-2">
        <h2>{title}</h2>
        <div className="flex space-x-4">
          <Rating value={4} readonly />
          <Typography color="blue-gray" className="font-medium">
            {'xx'}.0 Rated
          </Typography>
        </div>
        <p>{genre}</p>
        <p>{new Date(publicationDate).toDateString()}</p>
        <p>{language}</p>
        <p>{details}</p>

        <br />
        <br />
        <br />
        <p>reviews</p>
        <div>
          <div className="flex space-x-4">
            <Rating value={rating} onChange={value => setRating(value)} />
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
            <div>
              <div className="flex space-x-4">
                <Rating value={review.rating} />
                <Typography color="blue-gray" className="font-medium">
                  {review.rating}.0 Rated
                </Typography>
              </div>
              <p>{review.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute right-10 space-x-2">
        <Button
          onClick={() => navigate(`/edit-book-details/${_id}`)}
          color="blue"
          size="sm"
          className="shadow-md"
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
