import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Favorites from './pages/Favorites';
import Contact from './pages/Contact';
import ThreeScene from './components/ThreeScene';
import { TargetCursor } from './components/TargetCursor';
import RecipePage from './pages/RecipePage';

// import cursor from react-bits


export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <Router>
      {/* Custom Cursor */}
      <TargetCursor 
        spinDuration={5} 
        hideDefaultCursor={true} 
      />

      <Navbar />
      <div style={{ padding: '0 12px' }}>
        <Routes>
          <Route path="/" element={<Home selected={selected} onSelect={setSelected} />} />
          <Route path="/recipe/:id" element={<RecipePage favorite={favorite} setFavorite={setFavorite}  toggleFavoriteInApp={toggleFavoriteInApp}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
