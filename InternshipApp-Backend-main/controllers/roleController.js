const { body, validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createRole = [
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
  body("passoutYear")
    .isInt({ min: 1900, max: new Date().getFullYear() })
    .withMessage("Invalid passout year"),
  body("college")
    .trim()
    .isLength({ min: 2 })
    .withMessage("College name must be at least 2 characters long")
    .escape(),
  body("skills")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Skills must be at least 2 characters long")
    .escape(),
  body("experience").trim().optional().escape(),
  body("certificate").trim().optional().escape(),
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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      email,
      degree,
      passoutYear,
      college,
      skills,
      experience,
      certificate,
      city,
      state,
      joiningDate,
      address,
    } = req.body;
    const year = passoutYear;

    try {
      const internData = await prisma.role.create({
        data: {
          name,
          email,
          degree,
          passoutYear: year,
          college,
          skills,
          experience,
          certificate,
          city,
          state,
          joiningDate: joiningDate || new Date(),
          address,
        },
      });
      res.status(200).json(internData);
    } catch (error) {
      console.error("Error creating intern data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.getAllRoles = async (req, res) => {
  try {
    const allInterns = await prisma.role.findMany();
    res.status(200).json(allInterns);
  } catch (error) {
    console.error("Error fetching interns:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const intern = await prisma.role.findUnique({
      where: { id: parseInt(id) },
    });
    if (!intern) {
      return res.status(404).json({ error: "Intern not found" });
    }
    res.status(200).json(intern);
  } catch (error) {
    console.error("Error fetching intern:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      degree,
      passoutYear,
      college,
      skills,
      experience,
      certificate,
      city,
      state,
      joiningDate,
      address,
    } = req.body;
   
    const year = parseInt(passoutYear)

    const updatedIntern = await prisma.role.update({
      where: { id: parseInt(id) },
      data:{
        name,
      email,
      degree,
      passoutYear:year,
      college,
      skills,
      experience,
      certificate,
      city,
      state,
      joiningDate,
      address,
      }
    });

    res.status(200).json(updatedIntern);
  } catch (error) {
    console.error("Error updating intern:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.role.delete({ where: { id: parseInt(id) } });
    res
      .status(200)
      .json({ message: "Intern deleted successfully!", internId: id });
  } catch (error) {
    console.error("Error deleting intern:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
