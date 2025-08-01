import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "../homePage/HomePage.scss";
import Header from "../header/Header";
import RecipeList from "../recipeList/RecipeList";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import { setSavedRecipes } from "../../state";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Only user and savedRecipes are used now
  const { user, savedRecipes } = useSelector((state) => state);

  const [recipeDetail, setRecipeDetail] = useState(null);
  const [randomRecipes, setRandomRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState();

  // API Key for Spoonacular (if you want to keep external search)
  const API_KEY = process.env.REACT_APP_RECIPE_APP_API_KEY;
  const SEARCH_RECIPE_URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=12`;
  const RANDOM_RECIPE_URL = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=12`;

  /* ----------------------------
     Handle Bookmark (saved recipe)
  -------------------------------*/
  const handleBookmarkClick = async (recipeId) => {
    if (!user) return;

    // Use static backend endpoint
    const response = await axios.put(
      `http://localhost:8080/users/${user.id}/savedRecipe`,
      { recipeId },
      { headers: { "Content-Type": "application/json" } }
    );

    const savedRecipesData = response.data;
    if (savedRecipesData) {
      dispatch(setSavedRecipes({ savedRecipes: savedRecipesData }));
    }
  };

  /* ----------------------------
     Get Random Recipes (Spoonacular or Local)
  -------------------------------*/
  const getRandom = async () => {
    const api = await axios.get(RANDOM_RECIPE_URL);
    setRandomRecipes(api.data.recipes);
  };

  useEffect(() => {
    getRandom();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ----------------------------
     Handle Recipe Details
  -------------------------------*/
  const handleRecipeDetails = async (check, recipeDetail) => {
    if (check) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeDetail}/information?apiKey=${API_KEY}`
      );
      const data = response.data;
      setRecipeDetail(data);
    } else {
      setRecipeDetail(recipeDetail);
    }
  };

  /* ----------------------------
     Search Recipes
  -------------------------------*/
  const searchRecipes = async (query) => {
    const response = await axios.get(SEARCH_RECIPE_URL, {
      params: { query },
    });
    setSearchedRecipes(response.data.results);
  };

  /* Navigation handlers */
  function handleNavigateHome() {
    setRecipeDetail(null);
    navigate("/home");
  }

  function handleNavigateProfile(userId) {
    setRecipeDetail(null);
    navigate(`/profile/${userId}`);
  }

  return (
    <div className="home-page-container">
      {/* Header */}
      <Header
        searchRecipes={searchRecipes}
        isHome={true}
        handleNavigateHome={handleNavigateHome}
        handleNavigateProfile={handleNavigateProfile}
      />

      {/* Recipe Detail or List */}
      {recipeDetail ? (
        <RecipeDetail recipe={recipeDetail} />
      ) : (
        <div className="recipe-catalogue-container">
          {/* Search results OR random recipes */}
          {searchedRecipes
            ? searchedRecipes.map((recipe, index) => (
                <RecipeList
                  key={index}
                  recipe={recipe}
                  recipeType="searchedRecipe"
                  handleRecipeDetails={handleRecipeDetails}
                  onBookmarkClick={handleBookmarkClick}
                  isBookmarked={savedRecipes.includes(recipe.id)}
                  isHome={true}
                />
              ))
            : randomRecipes.map((recipe, index) => (
                <RecipeList
                  key={index}
                  recipe={recipe}
                  recipeType="randomRecipe"
                  handleRecipeDetails={handleRecipeDetails}
                  onBookmarkClick={handleBookmarkClick}
                  isBookmarked={savedRecipes.includes(recipe.id)}
                  isHome={true}
                />
              ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
