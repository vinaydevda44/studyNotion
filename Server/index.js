const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const dotenv = require("dotenv");
dotenv.config();

// Routes
const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");

// Config
const database = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinary");

// Server Port
const PORT = process.env.PORT || 4000;

// Connect DB
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));


const allowedOrigins = [ 
  "http://localhost:3000",
  "http://localhost:5173",
  "https://study-notion-lac-five.vercel.app" 
];

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
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],  
  })
);


app.options("*", cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Cloudinary setup
cloudinaryConnect();

// Routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is on and running ....",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
