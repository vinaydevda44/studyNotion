const express = require('express');
const app = express();
const cors = require("cors"); 

const userRoutes = require("./routes/User");  
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");  
const cookieParser = require('cookie-parser');


const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is on and running ....",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
