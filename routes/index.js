// calls all other route files and then sends the react package

const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const fs = require("fs");

// API Routes
router.use(apiRoutes);

// If no API routes are hit, send the React app

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


// the following code doesn't work in development as create-react-app sets it up so that the
// client index.html is read independently of the node server. So the route above doesn't do anything ...
// would work in production, but that's not really where the benefit is

// read html file, set global variables you want to pass into react (NODE_ENV)

// console.log("Sending index.html to client browser");
// console.log("NODE_ENV = " + process.env.NODE_ENV);
// router.use(function (req, res) {
//   let data = fs.readFileSync(path.join(__dirname, "../client/public/index.html"));
//   console.log("index.html read");
//   console.log(data);
//   console.log("Here");
//   const newData = data.toString() 
//     .replace(/<\/noscript>/, `</noscript>\n<script>let NODE_ENV="${process.env.NODE_ENV}"</script>\n`);
//   // console.log(newData);
//   res.send(newData);
// });

module.exports = router;