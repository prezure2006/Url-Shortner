import express from "express";
import UrlModel from "../models/url.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");

  const allUrl = await UrlModel.find({ createdBy: req.user._id });

  return res.render("home", {
    urls: allUrl,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
