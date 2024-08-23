const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addEmployee = [
  // Validate and sanitize inputs
  body("name")
    .trim()
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 characters long")
    .escape(),
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("degree")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Degree must be at least 2 characters long")
    .escape(),
  body("experience")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Experience must be at least 1 character long")
    .escape(),
  body("mobileNumber")
    .trim()
    .isLength({ min: 10, max: 15 })
    .withMessage("Mobile number must be between 10 and 15 digits")
    .escape(),
  body("role")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Role must be at least 3 characters long")
    .escape(),
  body("city")
    .trim()
    .isLength({ min: 2 })
    .withMessage("City must be at least 2 characters long")
    .escape(),
  body("state")
    .trim()
    .isLength({ min: 2 })
    .withMessage("State must be at least 2 characters long")
    .escape(),
  body("joiningDate")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Invalid date format"),
  body("address")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Address must be at least 5 characters long")
    .escape(),

  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      degree,
      experience,
      mobileNumber,
      role,
      city,
      state,
      joiningDate,
      address,
    } = req.body;

    try {
      const formData = await prisma.employee.create({
        data: {
          name,
          email,
          degree,
          experience,
          mobileNumber,
          role,
          city,
          state,
          joiningDate: joiningDate || new Date(),
          address,
        },
      });
      res.status(200).json(formData);
    } catch (error) {
      console.error("Error creating form data:", {
        name,
        email,
        degree,
        experience,
        mobileNumber,
        role,
        city,
        state,
        joiningDate,
        address,
        error,
      });
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.getEmployees = async (req, res) => {
  try {
    const allDetails = await prisma.employee.findMany();
    res.status(200).json(allDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};



exports.getEmployee = async (req, res) => {
  const { id } = req.params; // Assume ID is passed as a URL parameter
  console.log("Received ID:", id);

  try {
    // Convert the ID to an integer
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const singleData = await prisma.employee.findUnique({
      where: {
        id: numericId, // Use the numeric ID here
      },
    });

    if (!singleData) {
      return res.status(404).json({ message: "Data not found" });
    }
    
    res.status(200).json(singleData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};


exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedRecord = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await prisma.employee.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Item deleted successfully!", itemId: id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
