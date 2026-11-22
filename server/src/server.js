require("dotenv").config();
const app = require("./app.js");
// const app = require("./app.js");
// console.log("App loaded from:", require.resolve("./app.js"));
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// console.log("Server file started");
// console.log(app);
// console.log(typeof app);
// console.log("Running file:", __filename);
// Connect DB
connectDB();

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});