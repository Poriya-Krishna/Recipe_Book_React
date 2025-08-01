import React, { useEffect, useState } from "react";
import "../profilePage/ProfilePage.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setSavedRecipes } from "../../state/index";
import Header from "../header/Header";
import User from "../user/User";
import RecipeList from "../recipeList/RecipeList";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [recipeDetail, setRecipeDetail] = useState(null);
  const dispatch = useDispatch();

  // Select user and saved recipes from Redux
  const { user, savedRecipes } = useSelector((state) => state);

  // API key (for Spoonacular)
  const API_KEY = process.env.REACT_APP_RECIPE_APP_API_KEY;

  // Fetch saved recipes (IDs) from static backend and details from Spoonacular
  const getSavedRecipes = async () => {
    try {
      // Get saved recipe IDs from local backend
      const savedRecipesResponse = await axios.get(
        `http://localhost:8080/users/${user.id}/savedRecipe`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const savedRecipesData = savedRecipesResponse.data;

      if (savedRecipesData) {
        dispatch(setSavedRecipes({ savedRecipes: savedRecipesData }));
      }

      // If savedRecipes is not empty, fetch details from Spoonacular
      if (savedRecipesData.length > 0) {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/informationBulk?apiKey=${API_KEY}&ids=${savedRecipesData.join(",")}`
        );
        setRecipes(response.data);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.log("Error fetching saved recipes:", error);
    }
  };

  // Run on initial render
  useEffect(() => {
    if (user?.id) {
      getSavedRecipes();
    }
  }, [user]);

  // Handle recipe detail click
  function handleRecipeDetails(check, recipeDetail) {
    setRecipeDetail(recipeDetail);
  }

  // Navigation handlers
  function handleNavigateHome() {
    setRecipeDetail(null);
    navigate("/home");
  }

  function handleNavigateProfile(userId) {
    setRecipeDetail(null);
    navigate(`/profile/${userId}`);
  }

  return (
    <div>
      <Header
        isHome={false}
        handleNavigateHome={handleNavigateHome}
        handleNavigateProfile={handleNavigateProfile}
      />
      {recipeDetail ? (
        <RecipeDetail recipe={recipeDetail} />
      ) : (
        <div className="profile-container">
          <User user={user} />
          <h1 className="saved-recipes-text">Saved Recipes</h1>

          <div className="profile-recipe-catalogue-container">
            {recipes.length > 0 ? (
              recipes.map((recipe, index) => (
                <RecipeList
                  key={index}
                  recipe={recipe}
                  handleRecipeDetails={handleRecipeDetails}
                  isBookmarked={savedRecipes.includes(recipe.id)}
                  isHome={false}
                />
              ))
            ) : (
              <p className="no-recipes">No saved recipes yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
