import { nanoid } from "nanoid";
import URL from "../models/url.model.js";

export const handleGenerateNewShortUrl = async (req, res) => {
  try {
    console.log(
      "HIT:",
      req.method,
      req.url,
      req.headers["content-type"],
      req.body,
    );
    const body = req.body;

    if (!body || !body.url) {
      return res.status(400).send("url is required");
    }

    const shortId = nanoid(8);

    await URL.create({
      shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });

    const allUrls = await URL.find({});

    // Pass 'urls: allUrls' so home.ejs gets the list for the table
    return res.render("home", {
      id: shortId,
      urls: allUrls,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const handleGetAnalytics = async (req, res) => {
  try {
    const result = await URL.findOne({ shortId: req.params.shortId });
    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    return res.json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};
