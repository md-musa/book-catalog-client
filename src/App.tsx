import Footer from './components/Footer';
import Nav from './components/Nav';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="max-w-6xl mx-auto">
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
