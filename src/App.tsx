import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import PokemonDetailPage from './pages/PokemonDetailPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/favorites" element={<Favorites />} /> 
          <Route path="/pokemon/:id" element={<PokemonDetailPage />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;Favorites