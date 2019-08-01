// calls all other route files and then sends the react package

const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");

// API Routes
router.use("/api",apiRoutes);

// If no API routes are hit, send the React app

router.use(function (req, res) {
  if (process.env.NODE_ENV !== "production") {
    console.log("If in development, api path not recognized, loading index.html by mistake\n");
  }
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


module.exports = router;