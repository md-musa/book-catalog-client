import { useGetWishlistQuery } from '../store/features/wishlist/wishlistApiSlice';
import WishlistCard from '../components/WishlistCard';

function Wishlist() {
  const { data: wishlists, isError, isLoading } = useGetWishlistQuery(undefined);
  // console.log(wishlists.data.);
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {wishlists?.data.map(w => (
        <WishlistCard book={w.book} />
      ))}
    </div>
  );
}

export default Wishlist;
