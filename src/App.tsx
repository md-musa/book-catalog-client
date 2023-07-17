import Footer from './components/Footer';
import Nav from './components/Nav';
import AddNewBook from './pages/AddNewBook';
import AllBooks from './pages/AllBooks';
import BookDetails from './pages/BookDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Routes, Route } from 'react-router-dom';
import Wishlist from './pages/Wishlist';
import ReadingList from './pages/ReadingList';
import EditBook from './pages/EditBook';
import { useDispatch } from 'react-redux';
import { setCredentials } from './store/features/auth/authSlice';
import { useEffect } from 'react';

function App() {
  const dispatch = useDispatch();
  const userCredentials = localStorage.getItem('userCredentials') || null;

  useEffect(() => {
    if (userCredentials) {
      const credentials = JSON.parse(userCredentials);
      dispatch(setCredentials(credentials));
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/all-books/:id" element={<BookDetails />} />
        <Route path="/add-new-book" element={<AddNewBook />} />
        <Route path="/edit-book-details/:id" element={<EditBook />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/reading-list" element={<ReadingList />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
