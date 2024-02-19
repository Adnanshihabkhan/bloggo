require("dotenv").config();

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const blogRouter = require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const Blog = require("./models/blog");
const app = express();
const PORT = 8000;

// process.env.PORT;
// process.env.MONGODB_URL
mongoose
  .connect("mongodb://localhost:27017")
  .then((e) => console.log("MongoDB is Connected "));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const allblog = await Blog.find({});
  res.render("Home", {
    user: req.user,
    blogs: allblog,
  });
});
app.use("/user", userRoute);
app.use("/blog", blogRouter);
app.listen(PORT, () => {
  console.log("Server is started at " + PORT);
});
