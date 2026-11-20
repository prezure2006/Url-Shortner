import express from "express";
import path from "path";
import urlRoute from "./routes/url.js";
import URL from "./models/url.model.js";
import staticRoute from "./routes/staticRoute.js";
import UserRoute from "./routes/user.js";
import connectToMDBS from "./config/connext.js";
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
// middleware in request processing pipeline
app.use(express.json());
// it make the incoming form data into req.body accessing data
app.use(express.urlencoded({ extended: false }));
// it takes the cookie from the incoming request and makes it accessible in req.cookie
app.use(cookieParser());
// middleware to make the main page accessible to the logged in user only
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
// server starting
app.listen(PORT, () => {
  console.log("Server started at port", PORT);
});
