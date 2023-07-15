import { Button, Rating, Textarea, Typography } from '@material-tailwind/react';
import React from 'react';

function BookDetails() {
  const [rated, setRated] = React.useState(4);

  return (
    <div className="grid grid-cols-[1fr_2fr] space-x-5">
      <div className="p-4">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrBstXAmkzVK-Ze6Lg_gZMVl57-7Oyvpw6QA&usqp=CAU" alt="" />
      </div>

      <div className="p-5 space-y-2">
        <h2>Book title</h2>
        <div className="flex space-x-4">
          <Rating value={4} readonly />
          <Typography color="blue-gray" className="font-medium">
            {'xx'}.0 Rated
          </Typography>
        </div>
        <p>Genre</p>
        <p>Publication date</p>
        <p>Language</p>
        <p>Description</p>

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
        <Button color="blue" size="sm" className="shadow-md">
          Edit
        </Button>
        <Button color="red" size="sm" className="shadow-md">
          Delete
        </Button>
      </div>
    </div>
  );
}

export default BookDetails;
