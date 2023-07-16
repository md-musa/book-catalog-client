import { useState, useEffect } from 'react';
import { Navbar, MobileNav, Typography, Button, IconButton } from '@material-tailwind/react';
import { Link, useAsyncError, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/features/auth/authSlice';

export default function Nav() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  console.log('Navber  ', auth);

  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const handleLogout = () => {
    dispatch(logout({}));
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/all-books" className="flex items-center">
          All Books
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <Link to="/" className="flex items-center">
          Contact Us
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-normal">
        <a href="#" className="flex items-center">
          Privacy & Policy
        </a>
      </Typography>
      <Button onClick={() => navigate('/add-new-book')} className="rounded-full" size="sm" variant="outlined">
        Add Book
      </Button>
    </ul>
  );

  return (
    <Navbar className="mx-auto my-4 border-2 border-[#f0f0f0] max-w-screen-xl px-4 lg:px-6 lg:py-3">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography as="a" href="#" className="mr-4 cursor-pointer py-1.5 font-medium">
          <Link to="/">Bookie</Link>
        </Typography>
        <div className="hidden lg:block">{navList}</div>

        {!auth.user ? (
          <Button onClick={() => navigate('/login')} variant="gradient" size="sm" className="hidden lg:inline-block">
            <span>Login</span>
          </Button>
        ) : (
          <Button onClick={handleLogout} variant="gradient" size="sm" className="hidden lg:inline-block">
            <span>Logout</span>
          </Button>
        )}

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </IconButton>
      </div>

      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button onClick={() => navigate('/login')} variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Login</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}
