require('dotenv').config(); // Load environment variables
const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating tokens
const mongoose = require("mongoose"); // MongoDB ODM
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// CORS configuration - adjust this to your frontend URL
const corsOptions = {
    origin: "http://localhost:3000", // Change this if your frontend is hosted on a different URL
    methods: ["GET", "POST"],
    credentials: true,
};
app.use(cors(corsOptions)); // Enable CORS for all routes

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Log incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} request made to: ${req.url}`);
    next();
});

// User schema and model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Signup endpoint
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user in the database
        const user = await User.create({
            email,
            password: hashedPassword,
        });

        // Generate a token (optional)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user._id, email: user.email } }); // Send response
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Error during signup." });
    }
});

// Payment Intent endpoint
app.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body; // Get the amount from the request body
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // The amount to charge in cents (e.g., 1000 for $10.00)
            currency: "usd", // Set the currency to USD
        });
        res.json({ clientSecret: paymentIntent.client_secret }); // Send back the client secret
    } catch (error) {
        console.error("Error creating payment intent:", error.message);
        res.status(500).json({ error: error.message }); // Send back detailed error message
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
