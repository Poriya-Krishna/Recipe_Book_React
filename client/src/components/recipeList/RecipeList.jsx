import React from 'react';
import "../recipeList/RecipeList.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

/**
 * Renders a single recipe in the recipe catalog list
 * @param {Object} recipe - The recipe object containing recipe information
 * @param {Function} handleRecipeDetails - Function to handle clicking on a recipe to show details
 * @param {Function} onBookmarkClick - Function to handle bookmarking a recipe
 * @param {Boolean} isBookmarked - Whether the recipe is bookmarked
 * @param {Boolean} isHome - Whether the recipe is being rendered on the home page
 * @returns {JSX.Element} - The recipe list component
 */
const RecipeList = ({ recipe, recipeType, handleRecipeDetails, onBookmarkClick, isBookmarked, isHome }) => {
  // Determine how recipe details should be passed based on type
  function handleRecipeClick() {
    if (recipeType === "searchedRecipe") {
      handleRecipeDetails(true, recipe.id);
    } else {
      handleRecipeDetails(false, recipe);
    }
  }

  return (
    <div className="recipe-container" onClick={handleRecipeClick}>
      <img
        src={recipe.image || "/assets/default-recipe.jpg"} // fallback image
        alt={recipe.title || "Recipe"}
        className="recipe-catalogue-image"
      />
      <div className="recipe-catalogue-title">
        <span className="recipe-title">{recipe.title || "Untitled Recipe"}</span>
        {isHome && (
          <FontAwesomeIcon
            className={`bookmark-icon ${isBookmarked ? "bookmarked" : ""}`}
            icon={faBookmark}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Recipe"}
            onClick={(e) => {
              e.stopPropagation();
              onBookmarkClick(recipe.id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeList;
