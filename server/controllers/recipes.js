import { users, recipes, savedRecipes } from "../data.js";


/* GET ALL RECIPES */
export const getRecipes = (req, res) => {
  try {
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ADD NEW RECIPE */
export const addRecipe = (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "Title and description are required." });
    }

    const newRecipe = {
      id: `recipe-${Date.now()}`,
      title,
      description
    };

    recipes.push(newRecipe);
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
