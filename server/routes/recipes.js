import express from "express";
import { getRecipes, addRecipe } from "../controllers/recipes.js";

const router = express.Router();

/* GET all recipes */
router.get("/", getRecipes);

/* POST add new recipe */
router.post("/add", addRecipe);

export default router;
