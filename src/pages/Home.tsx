import React from 'react';
import BookCard from '../components/BookCard';
import Nav from '../components/Nav';

function Home() {
  return (
    <div className="">
      <Nav />
      <div className="my-10 grid grid-cols-4 gap-4">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
}

export default Home;
