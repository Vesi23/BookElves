import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/Home/Home';
import About from './views/About/About';
import Login from './views/Login/Login';
import Register from './views/Register/Register';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<h1>Not Found</h1>} />

        </Routes>
      </BrowserRouter>
    </>
  );

}

export default App;
