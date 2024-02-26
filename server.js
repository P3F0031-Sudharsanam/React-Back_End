const express = require("express");
const cors = require("cors");

const app = express();
// const basicAuth = require("express-basic-auth");
require("dotenv").config();

// const api_Username = process.env.API_BASIC_AUTH_USERNAME;
// const api_Password = process.env.API_BASIC_AUTH_PASSWORD;

var corsOptions = {
  origin: true,
};
app.use(cors(corsOptions));

//Set API Basic Auth Username and password
// const user = {};
// user[api_Username] = api_Password;
// const users = { users: user };
// app.use(basicAuth(users));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Server is running successfully. 🚀🚀🚀" });
});

// require("./app/routes/form.routes")(app);
require("./app/routes/users.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});



// const express = require("express");
// const cors = require("cors");
// const multer = require("multer");
// const fs = require("fs");

// const app = express();
// require("dotenv").config();

// var corsOptions = {
//   origin: true,
// };
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const db = require("./app/models");
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Set filename as current timestamp + original filename
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/", (req, res) => {
//   res.json({ message: "Server is running successfully. 🚀🚀🚀" });
// });

// // Route for handling user avatar uploads
// app.post("/upload-avatar", upload.single("avatar"), async (req, res) => {
//   try {
//     // Retrieve user data from request body
//     const { name, description } = req.body;
//     // Read uploaded file as binary data
//     const avatarData = fs.readFileSync(req.file.path);
//     // Create a new user record in the database, including the avatar binary data
//     const newUser = await db.Users.create({
//       name,
//       description,
//       avatar: avatarData,
//     });
//     res.json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to add user" });
//   }
// });

// // Include other routes as needed

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
