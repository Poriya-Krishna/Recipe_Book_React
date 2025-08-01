import React, { useState } from "react";
import "../recipeDetail/RecipeDetail.scss";

/**
 * Renders the recipe details component
 * @param {Object} recipe - The recipe object containing recipe information
 * @returns {JSX.Element} - The recipe details component
 */
const RecipeDetail = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState("instructions");

  return (
    <div className="recipe-detail-container">
      <h1 className="recipe-detail-heading">{recipe?.title}</h1>

      <div className="recipe-detail-flex-container">
        {/* LEFT: Image and cooking time */}
        <div className="recipe-detail-left-wrapper">
          {recipe?.readyInMinutes && (
            <span className="cooking-time">
              Cooking time:{" "}
              <span style={{ color: "#5457b6" }}>{recipe.readyInMinutes} minutes</span>
            </span>
          )}
          {recipe?.image && (
            <img
              className="recipe-detail-image"
              src={recipe.image}
              alt={recipe.title || "Recipe image"}
            />
          )}
        </div>

        {/* RIGHT: Tabs and content */}
        <div className="recipe-detail-right-wrapper">
          <div className="recipe-detail-button-wrapper">
            <button
              className={activeTab === "instructions" ? "active" : "inactive"}
              onClick={() => setActiveTab("instructions")}
            >
              Instructions
            </button>
            <button
              className={activeTab === "ingredients" ? "active" : "inactive"}
              onClick={() => setActiveTab("ingredients")}
            >
              Ingredients
            </button>
          </div>

          {activeTab === "instructions" && (
            <div className="recipe-detail-instruction">
              {recipe?.summary && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: recipe.summary,
                  }}
                ></div>
              )}
              {recipe?.instructions && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: recipe.instructions,
                  }}
                ></div>
              )}
            </div>
          )}

          {activeTab === "ingredients" && (
            <ul>
              {recipe?.extendedIngredients?.map((ingredient) => (
                <li key={ingredient.id || ingredient.original}>
                  {ingredient.original}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
