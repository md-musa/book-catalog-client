import { useGetWishlistQuery } from '../store/features/wishlist/wishlistApiSlice';
import WishlistCard from '../components/WishlistCard';

function Wishlist() {
  const { data: wishlists } = useGetWishlistQuery(undefined);
  console.log('🚀 ~ file: Wishlist.tsx:6 ~ Wishlist ~ wishlists:', wishlists);
  if (!wishlists) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {wishlists?.data.map(w => (
        <WishlistCard book={w} />
      ))}
    </div>
  );
}

export default Wishlist;
