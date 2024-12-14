const express = require("express");
const connectDB = require("./config/dbConfig");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());  

connectDB();

app.use("/api/user", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.error("Missing essential environment variables: MONGO_URI or JWT_SECRET");
  process.exit(1); 
}
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
