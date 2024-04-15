import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from "react-toastify";
import './App.css';
import LoginIndex from '../src/components/login/Index';
import HomeIndex from '../src/components/home/Index';
import SideBar from '../src/components/sideBar/Index';
import NavBar from '../src/components/navbar/Index';
import BooksIndex from '../src/components/books/Index';
import BooksInfoIndex from '../src/components/booksinfo/Index';
import StudentsInfoIndex from '../src/components/studentsinfo/Index';
import ReturnIndex from '../src/components/return/Index';
import StudentsIndex from '../src/components/students/Index';
import NotFound from '../src/components/notfound/Index';

const App = () => {
  // State hook to manage authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect hook to check authentication status on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('dFauth');
    if (storedAuth) {
      const { isAuthenticated: storedIsAuthenticated } = JSON.parse(storedAuth);
      setIsAuthenticated(storedIsAuthenticated);
    }
  }, []);

  // Function to update authentication status
  const handleUpdate = (auth) => {
    setIsAuthenticated(auth);
    localStorage.setItem('dFauth', JSON.stringify({ isAuthenticated: auth }));
  };

  return (
    <Router basename={'/'}>
      {isAuthenticated ? (
        <>
          <NavBar updateRoutes={handleUpdate} />
          <SideBar />
          <Routes>
            <Route exact path="/" element={<HomeIndex />} />
            <Route path="/home" element={<HomeIndex />} />
            <Route path="/books" element={<BooksIndex />} />
            <Route exact path="/book" element={<BooksIndex />} />
            <Route path="/return" element={<ReturnIndex />} />
            <Route path="/students" element={<StudentsIndex />} />
            <Route path="/book/*" element={<BooksInfoIndex />} />
            <Route path="/student/*" element={<StudentsInfoIndex />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer className='toast-container' toastClassName="darkToast" progressClassName="progressbar" />
        </>
      ) : (
        <Routes>
          <Route path="/login" element={<LoginIndex updateRoutes={handleUpdate} />} />
          <Route path="*" element={<LoginIndex updateRoutes={handleUpdate} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
