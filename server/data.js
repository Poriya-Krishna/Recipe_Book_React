// server/data.js

// Users (Plain IDs, simple passwords for demo)
export const users = [
  {
    id: "1",
    firstName: "Demo",
    lastName: "User",
    email: "demo@example.com",
    password: "123456",
    picture: "p11.jpeg"
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Ralph",
    email: "steve@gmail.com",
    password: "123456",
    picture: "p3.jpeg"
  }
];

// Recipes (15 default recipes)
export const recipes = [
  { id: "recipe-1", title: "Pasta Alfredo", description: "Creamy Alfredo pasta with parmesan cheese." },
  { id: "recipe-2", title: "Margherita Pizza", description: "Classic pizza with tomato, mozzarella, and basil." },
  { id: "recipe-3", title: "Veggie Burger", description: "Healthy vegetarian burger with lentils and beans." },
  { id: "recipe-4", title: "Chocolate Cake", description: "Moist chocolate cake topped with rich ganache." },
  { id: "recipe-5", title: "Caesar Salad", description: "Crisp romaine lettuce with Caesar dressing and croutons." },
  { id: "recipe-6", title: "Butter Chicken", description: "Creamy Indian butter chicken curry with spices." },
  { id: "recipe-7", title: "Grilled Cheese Sandwich", description: "Cheesy and crispy sandwich perfect for breakfast." },
  { id: "recipe-8", title: "Tacos", description: "Mexican tacos with seasoned beef and salsa." },
  { id: "recipe-9", title: "French Fries", description: "Crispy golden French fries with sea salt." },
  { id: "recipe-10", title: "Pancakes", description: "Fluffy pancakes served with maple syrup." },
  { id: "recipe-11", title: "Lasagna", description: "Classic Italian lasagna layered with meat and cheese." },
  { id: "recipe-12", title: "Fried Rice", description: "Asian-style fried rice with veggies and soy sauce." },
  { id: "recipe-13", title: "Chicken Biryani", description: "Fragrant rice dish with spiced chicken pieces." },
  { id: "recipe-14", title: "Mushroom Soup", description: "Creamy mushroom soup garnished with parsley." },
  { id: "recipe-15", title: "Greek Salad", description: "Fresh salad with cucumber, feta, and olives." }
];

// Saved recipes (by user ID)
export const savedRecipes = [
  {
    userId: "1",
    recipeId: ["recipe-1", "recipe-2"]
  },
  {
    userId: "2",
    recipeId: ["recipe-3", "recipe-5"]
  }
];
