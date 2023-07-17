import { Button, Rating, Textarea, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteBookMutation, useGetSingleBookQuery } from '../store/features/books/bookApiSlice';
import { toast } from 'react-toast';

function BookDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [rated, setRated] = useState(4);

  const { data: bookData, isLoading: isBookLoading } = useGetSingleBookQuery(id);
  const [deleteBook] = useDeleteBookMutation();

  if (isBookLoading) return <p>Loading...</p>;
  const { _id, title, image, genre, publicationDate, language, details } = bookData?.data;

  const handleBookDelete = (bookId: string): void => {
    console.log('------------------');
    console.log(bookId);
    deleteBook(bookId);
  };

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
            <Rating value={4} onChange={value => setRated(value)} />
            <Typography color="blue-gray" className="font-medium">
              {rated}.0 Rated
            </Typography>
          </div>
          <Textarea label="Message" />
          <Button variant="gradient">Submit</Button>
        </div>
      </div>

      <div className="absolute right-10 space-x-2">
        <Button
          onClick={() => navigate('/edit-book-details/${_id}')}
          color="blue"
          size="sm"
          className="shadow-md"
        >
          Edit
        </Button>
        <Button onClick={() => handleBookDelete(_id)} color="red" size="sm" className="shadow-md">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BookDetails;
