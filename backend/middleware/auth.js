import { getUserId } from "../service/auth.js";
async function restirctToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
  if (!userUid) res.redirect("/login");
  const user = getUserId(userUid);

  if (!user) res.redirect("/login");
  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUserId(userUid);

  req.user = user;
  next();
}

export { restirctToLoggedInUserOnly, checkAuth };
