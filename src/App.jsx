import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import MoviesPage from './pages/MoviesPage'; 
import LocationsPage from './pages/LocationsPage'; 
import BarPage from './pages/BarPage'; 
import CorporatePage from './pages/CorporatePage'; 
import LoginPage from './pages/LoginPage'; 
import FaqPage from './pages/FaqPage'; 
//import pages here

function App() {
  return (
    <Routes>
      {/* Default Route: Navigate to HomePage */}
      <Route path="/" element={<HomePage />} /> 
      <Route path="/movies" element={<MoviesPage />} />
      {/*<Route path="/movies/:id" element={<MovieDetailsPage />} />
      <Route path="/movieDetails" element={<MovieDetailsPage />} />*/}
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/bar" element={<BarPage />} />
      <Route path="/corporate" element={<CorporatePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/faq" element={<FaqPage />} />
    </Routes>
  );
}

export default App;

