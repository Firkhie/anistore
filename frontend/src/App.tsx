import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import Explore from './pages/explore';
import Item from './pages/item';
import Cart from './pages/cart';
import Order from './pages/order';
import LoginSignup from './pages/login-signup';
import Wishlist from './pages/wishlist';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

function AppContent() {
  const location = useLocation();
  const excludeNavbarPaths: string[] = ["/login", "/register"];
  const showNavbar: boolean = !excludeNavbarPaths.includes(location.pathname);
  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/explore' element={<Explore/>} />
        <Route path='/item' element={<Item/>}>
          <Route path=':itemId' element={<Item/>} />
        </Route>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/order' element={<Order/>} />
        <Route path='/login' element={<LoginSignup/>} />
      </Routes>
    </div>
  );
}

export default App;
