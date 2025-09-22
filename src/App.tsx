import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyBookshelf from "./pages/MyBookshelf";
import BrowseBookshelves from "./pages/BrowseBookshelves";
import BookDetail from "./pages/BookDetail";
import SignUp from "./pages/SignUp";
import TagSearch from "./pages/TagSearch";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import UserProfile from "./pages/UserProfile";
import { BookshelfProvider } from "./contexts/BookshelfContext";
import Search from "./pages/Search";

function App() {
  const basename = import.meta.env.BASE_URL;

  return (
    <BrowserRouter basename={basename}>
      <BookshelfProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="my-bookshelf" element={<PrivateRoute><MyBookshelf /></PrivateRoute>} />
            <Route path="browse" element={<BrowseBookshelves />} />
            <Route path="book/:id" element={<BookDetail />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<Login />} />
            <Route path="tags" element={<TagSearch />} />
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="users/:userId" element={<UserProfile />} />
          </Route>
        </Routes>
      </BookshelfProvider>
    </BrowserRouter>
  );
}

export default App;
