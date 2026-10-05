import { v4 as uuidv4 } from "uuid";
import { setUser } from "../service/auth.js";
import User from "../models/users.model.js";

const handleUserAuth = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    console.log("User", user);

    if (!user) {
      return res.render("login", { error: "Cant Find the user " });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie("uid", sessionId);

    return res.redirect("/");
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).render("login", { error: "Server error occurred" });
  }
};
export { handleUserLogin, handleUserAuth };
