import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Landing } from './components/Landing';
import { PetCharacter } from './types';
import App from './App';

// Wrapper component per gestire il routing
function AppWithRouting() {
  const handlePetSelect = (character: PetCharacter) => {
    // Salva la selezione e naviga all'app principale
    localStorage.setItem('selectedPet', character);
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/home" 
          element={<Landing onPetSelect={handlePetSelect} />} 
        />
        <Route 
          path="/" 
          element={<App />} 
        />
        <Route 
          path="*" 
          element={<Navigate to="/" replace />} 
        />
      </Routes>
    </Router>
  );
}

export default AppWithRouting;
