import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import About from './views/About/About';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Header from './components/Header/Header';
import { AppContext } from './context/appContext';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import { getUserData } from './service/user';
import Profile from './views/Profile/Profile';
import CreatePost from './views/Create/CreatePost';
// import { Toast } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';
import Posts from './views/Posts/Posts';
// import ReadBook from './views/ReadBook/ReadBook';
import BookSearch from './views/ReadBook/ReadBook';
import CalendarView from './views/CalendarView/CalendarView';
import LikedPosts from './views/LikePosts/LikePosts';
import Category from './components/Category/Category';
import Friends from './views/Friends/Friends';


function App() {
  const [context, setContext] = useState({
    user: {} as any,
    userData: {} as any,
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      getUserData(user.uid)
        .then(snapshot => {
          if (snapshot.exists()) {
            setContext({ user, userData: snapshot.val()[Object.keys(snapshot.val())[0]] });
          }
        });
    }
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={{ ...context, setContext }}>
          <Header />
          <Toaster />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryName" element={<Category />} />
              <Route path="/calendar" element={<CalendarView />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/profile/:username' element={<Profile/>} />
              <Route path='/create' element={<CreatePost/>} />
              <Route path='/posts' element={<Posts/>} />
              <Route path='/like-post' element={<LikedPosts/>} />
              <Route path='friends' element={<Friends/>}/>
              {/* this is for book-> read and search */}
              <Route path='/books' element={<BookSearch/>}/>
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </div>
        </AppContext.Provider>
      </BrowserRouter>
    </>
  );

}

export default App;
