import React from 'react';
import { useGetReadingListQuery } from '../store/features/readingList/readingListApiSlice';
import ReadingListCard from '../components/ReadingListCard';

function ReadingList() {
  const { data: readingList, isLoading } = useGetReadingListQuery(undefined);
  console.log(readingList?.data);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {readingList?.data.map(w => (
        <ReadingListCard book={w} />
      ))}
    </div>
  );
}

export default ReadingList;
