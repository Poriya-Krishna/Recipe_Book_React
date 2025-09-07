import React, { useState, useEffect } from 'react';
import RecipeList from '../components/RecipeList';
import ThreeScene from '../components/ThreeScene';
import recipes from '../data/recipes.json';

export default function Home({onSelect, selected, favorite, toggleFavoriteInApp}){
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="main-content">
      <div className="recipe-list-container">
        <RecipeList 
          recipes={recipes} 
          onSelect={onSelect} 
          selected={selected}
          favorite={favorite}
          toggleFavorite={toggleFavoriteInApp}
        />
      </div>
      {!isMobile && selected && (
        <div className="three-scene-container">
          <ThreeScene recipe={selected} />
        </div>
      )}
    </div>
  )
}