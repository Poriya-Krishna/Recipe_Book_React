  // src/pages/RecipePage.jsx
  import React, { useState, useEffect } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  import recipes from "../data/recipes.json";
  import ThreeScene from "../components/ThreeScene";
  import FavoriteButton from "../components/FavoriteButton";
  import "video-react/dist/video-react.css";
  import { Player } from 'video-react';
  // import video from '../components/videoplayback.mp4';
  // import photo from '../components/download.jpg';
  import ReactPlayer from "react-player";
  import VideoPlayer from 'react-video-js-player';
import { div } from "three/tsl";

  export default function RecipePage({favorite, setFavorite, toggleFavoriteInApp}) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [showIngredients, setShowIngredients] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);
    const [newurl, setUrl] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    // const [favorite, setFavorite] = useState(false);
    //const [isFavorite, setIsFavorite] = useState(false);

  //   const toggleFavorite = () => {
  //   setIsFavorite((prev)=>
  //   prev.includes(recipe.id)?prev.filter((id)=>id!==recipe.id):[...prev, recipe.id]);
  // };
  <link rel="stylesheet" href="/css/video-react.css" />
useEffect(() => {
  const foundRecipe = recipes.find((r) => r.id === parseInt(id));
  if (foundRecipe) {
    setRecipe(foundRecipe);

    // Extract YouTube video ID and build standard URL
    // if (foundRecipe.video) {
    //   const videoId = foundRecipe.video.split("/").pop().split("?")[0];
    //   setUrl(`https://www.youtube.com/watch?v=${videoId}`);
    // }
  }

  const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

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

    const isFavorite = favorite.includes(recipe.id);

    const toggleFavorite = () => {
    toggleFavoriteInApp(recipe.id); 
};

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
    const handlePlayerReady = () => {
    console.log("Player is ready!");
  };
    const handleRefresh=()=>{
      window.location.reload();
    }

    return (
      <div className="recipe-page">
        {/* Back Button */}
        {/* <button onClick={() => navigate("/")} className="back-button">
          ← Back to Recipes
        </button> */}

        {/* Hero Section */}
        <div className="recipe-hero">
          <div className="hero-content">
            <h1 className="recipe-title">{recipe.name}</h1>
            <FavoriteButton
              isFavorite={isFavorite}
              onToggleFavorite={toggleFavorite}
            />
            <br />
            <div className="text">
                {recipe.desc}
            </div>
          </div>

          <div className="hero-visual">
            <div className="recipe-image-container">
              {/* <img
                src={recipe.image}
                alt={recipe.name}
                className="recipe-hero-image"
              /> */}
            </div>
            <div className="three-scene-hero">
              <ThreeScene recipe={recipe} />
            </div>
          </div>
          <div className="recipe-meta">
              <span className="meta-item">⏱️ {recipe.time}</span>
              <span className="meta-item">👥 Serves {recipe.serves}</span>
              <span className="meta-item">🏷️ {recipe.tags.join(", ")}</span>
          </div>
        </div>
        <br />

        {/* Tabs */}
        <div className="display">
          <div className="video-container">
            <div className="card cursor-target">
              <VideoPlayer
                controls={true}
                                src={recipe.video}
                                poster={recipe.photo}
                                width="720"
                                height="420"
                                onReady={handlePlayerReady}

              />
            </div>
          </div>
          <div>
            <button onClick={handleRefresh} className="cross-btn">
          ❌
        </button>
          </div>
          <div className="sidebar">
            <div className="display">
              <div className="display-card cursor-target">
                <button
                className={`tab-button ${showIngredients ? "active" : ""}`}
                onClick={() => setShowIngredients(true)}
              >
              🥬 Ingredients
              </button>
              </div>
              <div className="display-card cursor-target">
                <button
                className={`tab-button ${!showIngredients ? "active" : ""}`}
                onClick={() => setShowIngredients(false)}
              >
                👩‍🍳 Instructions
              </button>
              </div>
            </div>
          {showIngredients && (
            <div className= {isMobile?"mobile":""}>
              <section className="ingredients-grid">
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
            </div>
          
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
        </div>

        {/* Ingredients */}
        
      </div>
    );
  }
