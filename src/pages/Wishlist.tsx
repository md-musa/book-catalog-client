import { useGetWishlistQuery } from '../store/features/wishlist/wishlistApiSlice';
import WishlistCard from '../components/WishlistCard';

function Wishlist() {
  const { data: wishlists } = useGetWishlistQuery(undefined);
  console.log('🚀 ~ file: Wishlist.tsx:6 ~ Wishlist ~ wishlists:', wishlists);
  if (!wishlists) return <p>Loading...</p>;

  return (
    <>
      <h4 className="text-xl my-2 mx-4 mt-10 mb-5">Your wishlist:</h4>
      <div className="grid grid-cols-5 gap-4">
        {wishlists?.data.map(w => (
          <WishlistCard book={w} />
        ))}
      </div>
    </>
  );
}

export default Wishlist;
