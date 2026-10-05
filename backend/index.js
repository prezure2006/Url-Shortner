import express from "express";
import path from "path";
import urlRoute from "./routes/url.js";
import URL from "./models/url.model.js";
import staticRoute from "./routes/staticRoute.js";
import UserRoute from "./routes/user.js";
import connectToMDBS from "./connext.js";
import { handleUserAuth } from "./controllers/userAuth.js";
import cookieParser from "cookie-parser";
import { restirctToLoggedInUserOnly, checkAuth } from "./middleware/auth.js";
const app = express();
const PORT = 8001;

connectToMDBS("mongodb://localhost:27017/urlshortner").then(() => {
  console.log("MongoDb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/urls", restirctToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", UserRoute);
app.get("/:shortId", async (req, res) => {
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId: req.params.shortId },
      { $push: { visitHistory: { timestamp: Date.now() } } },
      { returnDocument: "after" },
    );

    if (!entry) return res.status(404).send("URL not found");

    return res.redirect(entry.redirectUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
