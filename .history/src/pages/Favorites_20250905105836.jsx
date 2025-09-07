import React from 'react';
import recipes from '../data/recipes.json';
import { Link } from 'react-router-dom';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

export default function Favorites({ favorite, recipeId }) {
  const favRecipes = recipes.filter((r) => favorite.includes(r.id));

  if (favRecipes.length === 0) {
    return <h2>No favorites yet ❤️</h2>;
  }

  const navigate = useNavigate()
  const handleNavigate =()=>{
    navigate(`/recipe/${recipeId}`)
  }

  return (
    <div className="recipe-list">
        {favRecipes.map((recipe) => (
        <div key={recipe.id} className="card" onClick={()=>navigate(`/recipe/${recipe.id}`)} style={{ cursor: "pointer" }}>
          <img src={recipe.image} alt={recipe.name}/>
            <div className="meta">
            <h3>{recipe.name}</h3>
            <p>{recipe.time} • Serves {recipe.serves}</p>
          </div>
        </div>
      ))}
      </div>
  );
}
