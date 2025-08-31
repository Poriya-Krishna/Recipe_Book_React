// src/pages/RecipePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import recipes from "../data/recipes.json";
import ThreeScene from "../components/ThreeScene";

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [showIngredients, setShowIngredients] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const foundRecipe = recipes.find((r) => r.id === parseInt(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [id]);

  if (!recipe) {
    return (
      <div className="recipe-page error">
        <h2>Recipe not found</h2>
        <button onClick={() => navigate("/")} className="back-btn">
          Back to Recipes
        </button>
      </div>
    );
  }

  const nextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="recipe-page">
      {/* Back Button */}
      <button onClick={() => navigate("/")} className="back-button">
        ← Back to Recipes
      </button>

      {/* Hero Section */}
      <div className="recipe-hero">
        <div className="hero-content">
          <h1 className="recipe-title">{recipe.name}</h1>
          <div className="recipe-meta">
            <span className="meta-item">⏱️ {recipe.time}</span>
            <span className="meta-item">👥 Serves {recipe.serves}</span>
            <span className="meta-item">🏷️ {recipe.tags.join(", ")}</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="recipe-image-container">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="recipe-hero-image"
            />
          </div>
          <div className="three-scene-hero">
            <ThreeScene recipe={recipe} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="content-tabs">
        <button
          className={`tab-button ${showIngredients ? "active" : ""}`}
          onClick={() => setShowIngredients(true)}
        >
          🥬 Ingredients
        </button>
        <button
          className={`tab-button ${!showIngredients ? "active" : ""}`}
          onClick={() => setShowIngredients(false)}
        >
          👩‍🍳 Instructions
        </button>
      </div>

      {/* Ingredients */}
      {showIngredients && (
        <section className="ingredients-section">
          <h2 className="section-title">🥬 Ingredients</h2>
          <div className="ingredients-grid">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-card">
                <span className="ingredient-icon">🌿</span>
                <span className="ingredient-text">{ingredient}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Instructions */}
      {!showIngredients && (
        <section className="instructions-section">
          <h2 className="section-title">👩‍🍳 Step-by-Step Instructions</h2>

          <div className="step-navigation">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="step-nav-btn"
            >
              ← Previous
            </button>
            <span className="step-counter">
              Step {currentStep + 1} of {recipe.steps.length}
            </span>
            <button
              onClick={nextStep}
              disabled={currentStep === recipe.steps.length - 1}
              className="step-nav-btn"
            >
              Next →
            </button>
          </div>

          <div className="current-step">
            <div className="step-number">Step {currentStep + 1}</div>
            <div className="step-content">{recipe.steps[currentStep]}</div>
          </div>
        </section>
      )}
    </div>
  );
}
