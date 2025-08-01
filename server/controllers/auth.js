import { users, recipes, savedRecipes } from "../data.js";


/* REGISTER USER */
export const register = (req, res) => {
  try {
    const { firstName, lastName, email, password, picture } = req.body;

    // Check if email already exists
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ msg: "User already exists." });
    }

    const newUser = {
      id: `${Date.now()}`,
      firstName,
      lastName,
      email,
      password, // no hashing (static mode)
      picture: picture || ""
    };

    users.push(newUser);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(400).json({ msg: "Invalid credentials." });

    // Return dummy token
    res.status(200).json({ token: "dummy-token", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
