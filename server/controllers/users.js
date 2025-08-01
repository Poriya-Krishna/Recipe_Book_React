import { users, recipes, savedRecipes } from "../data.js";


/* READ - Get saved recipes for a user */
export const getSavedRecipe = (req, res) => {
  try {
    const { userId } = req.params;
    const userData = savedRecipes.find(r => r.userId === userId);
    res.status(200).json(userData ? userData.recipeId : []);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE - Toggle saved recipe */
export const updateSavedRecipe = (req, res) => {
  try {
    const { userId } = req.params;
    const { recipeId } = req.body;

    let userData = savedRecipes.find(r => r.userId === userId);

    // If no saved recipes yet for this user
    if (!userData) {
      savedRecipes.push({ userId, recipeId: [recipeId] });
      return res.status(200).json([recipeId]);
    }

    // Toggle recipe: remove if exists, else add
    if (userData.recipeId.includes(recipeId)) {
      userData.recipeId = userData.recipeId.filter(id => id !== recipeId);
    } else {
      userData.recipeId.push(recipeId);
    }

    res.status(200).json(userData.recipeId);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
