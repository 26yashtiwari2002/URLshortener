const express=require("express")
const dotenv = require("dotenv");
const app=express();
dotenv.config();
const port=process.env.PORT || 8081;
const connectDB = require("./configs/mongodbConnection");
const { sanitizeInput } = require("./middlewares/sanitizeInput");
const Limiter = require("./middlewares/rateLimiter");
const urlRoutes = require("./routes/urlRoutes");
const cors = require('cors');
app.use(cors());

//connect to mongodb
connectDB();

//basic middlewares
app.use(express.json());

//extra middlewares
app.use(sanitizeInput);
app.use(Limiter);

//routes
app.use("/api", urlRoutes);
//home route
app.get("/",(req,res)=>{
    res.send("Home page for URL Shortener");
});

//404handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});