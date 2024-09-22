const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.register = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .escape(),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("isAdmin").isBoolean().optional(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, isAdmin = false } = req.body;

    try {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          verified: "N",
          verifyotp: otp,
          company_existing: "N",
          isAdmin, // Add the isAdmin field here
        },
      });

      // Configure nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT == 465, // Set to true if using port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false, // Ignore self-signed certificates
        },
      });

      // Construct email options
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Verify Your Email Address",
        html: `<p>Use this OTP: <strong>${otp}</strong> to verify your email. <a href="http://${req.headers.host}/verify-email?otp=${otp}">Click here</a> to verify your email.</p>`,
      };

      // Send email
      try {
        await transporter.sendMail(mailOptions);
      } catch (mailError) {
        console.error("Error sending email:", mailError);
        return res
          .status(500)
          .json({ message: "Failed to send verification email" });
      }

      res.status(201).json({ message: "Verification OTP sent successfully" });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];


exports.verifyToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided.' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.user = decoded;

    // Optional: Check if the user exists in the database
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      return res.status(401).json({ message: 'User not found.' });
    }

    next(); 
  } catch (error) {
    console.error('Token verification failed:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Unauthorized: Token has expired.' });
    }
    
    res.status(401).json({ message: 'Unauthorized: Invalid token.' });
  }
};


exports.checkAdmin = ('/check-admin', async (req, res) => {
  try {
    // Check if the user ID is present in the request
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Unauthorized: No user ID found in token.' });
    }

    // Fetch the user from the database using the ID from the token
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    // Check if the user was found
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Check if the user is an admin
    if (user.role === 'admin') {
      return res.status(200).json({ role: 'admin' });
    } else {
      return res.status(403).json({ isAdmin: false, message: 'Access denied. User is not an admin.' });
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  } finally {
    await prisma.$disconnect(); // Ensure Prisma disconnects after the request
  }
});

exports.verifyEmail = [
  // Validation for OTP
  body("otp")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be a 6-digit number")
    .isNumeric()
    .withMessage("OTP must be numeric"),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { otp } = req.body;

    try {
      // Find the user with the matching OTP and update the user status
      const result = await prisma.user.updateMany({
        where: { verifyotp: otp },
        data: { verifyotp: null, verified: "Y" },
      });

      if (result.count === 0) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      res.status(200).json({ message: "User verified successfully!" });
    } catch (err) {
      console.error("Error during email verification:", err);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];
exports.login = [
  // Validation for email and password
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      if (user.verified === "N") {
        return res.status(400).json({ message: "User email not verified" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

   
      const generateToken = (user) => {
        const payload = {
          id: user.id,
          email: user.email,
          role: user.role
        };

        return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' });
      };

      const token = generateToken(user); // Call generateToken to get the token

      res.status(200).json({ token }); // Send the token in the response
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];
exports.forgotPassword = [
  // Validation for email
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();

      // Update user with OTP (consider adding an expiry time for the OTP)
      await prisma.user.update({
        where: { email },
        data: { resetotp: otp },
      });

      // Set up the transporter
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_PORT === "465", // Use true if using port 465
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Mail options
      const resetUrl = `http://${req.headers.host}/reset-password`;
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: "Password Reset",
        html: `<p>Use this OTP: <strong>${otp}</strong> to reset your password. Use the following link to reset your password: <a href="${resetUrl}">Reset Password</a></p>`,
      };

      // Send email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Reset email sent successfully!" });
    } catch (error) {
      console.error("Error during password reset:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];

exports.resetPassword = [
  body("otp")
    .trim()
    .isLength({ min: 6, max: 6 })
    .withMessage("OTP must be a 6-digit number")
    .isNumeric()
    .withMessage("OTP must be numeric"),
  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { otp, newPassword } = req.body;

    try {
      // Find user by email and OTP
      const user = await prisma.user.findFirst({
        where: {
          resetotp: otp,
        },
      });

      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid email, OTP, or OTP has expired" });
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update user with new password and clear OTP
      await prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
          resetotp: null,
        },
      });

      res.status(200).json({ message: "Password reset successfully!" });
    } catch (error) {
      console.error("Error during password reset:", error);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await prisma.$disconnect();
    }
  },
];
exports.getAllUsers = async (req, res) => {
  try {
    // Retrieve all users with only the username field
    const users = await prisma.user.findMany({
      select: {
        username: true,
      },
    });

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    await prisma.$disconnect();
  }
};
exports.getUser = async (req, res) => {
  const { token } = req.query;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.id;

    // Find the user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  } finally {
    await prisma.$disconnect();
  }
};
