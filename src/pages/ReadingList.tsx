import {
  useGetReadingListQuery,
  useMarkAsFinishedMutation,
} from '../store/features/readingList/readingListApiSlice';
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  Tooltip,
} from '@material-tailwind/react';
import { READING_STATUS } from '../constants/readingListConstants';
const TABLE_HEAD = ['Image', 'Title', 'Author', 'Status', 'Mark as'];

function ReadingList() {
  const { data: readingList, isLoading } = useGetReadingListQuery(undefined);
  const [updateStatus] = useMarkAsFinishedMutation();

  function handleMarkAsFinished(id: string) {
    updateStatus({
      bookId: id,
      status: 'finished',
    });
  }
  if (isLoading) return <p>Loading...</p>;

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Reading List
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map(head => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {readingList?.data?.map(({ book, status }: any, index: number) => {
              const isLast = index === readingList.data.length - 1;
              const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

              return (
                <tr>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <img
                        src={book.image}
                        className="border w-16 border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {book.title.length < 20 ? book.title : book.title.slice(0, 20) + '...'}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {book.author}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        size="sm"
                        variant="ghost"
                        value={status}
                        color={status === READING_STATUS.FINISHED ? 'green' : 'amber'}
                      />
                    </div>
                  </td>

                  <td className={classes}>
                    {status === READING_STATUS.READ_SOON && (
                      <Tooltip content="Edit User">
                        <Button
                          className="border shadow-sm"
                          onClick={() => handleMarkAsFinished(book._id)}
                          size="sm"
                          variant="text"
                        >
                          Finished
                        </Button>
                      </Tooltip>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}

export default ReadingList;
