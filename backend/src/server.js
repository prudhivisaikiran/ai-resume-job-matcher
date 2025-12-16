const path = require("path");
const dotenv = require("dotenv");

// ✅ Force dotenv to load backend/.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

// Debug (temporary — remove after success)
console.log("MONGO_URI:", process.env.MONGO_URI);

// Connect to Database, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
